import Budget from "../models/budget.model.js";
import Transaction from "../models/transaction.model.js";

export const findBudgetVsExpenseUsage = async (userID, year, month) => {
	const matchState = {
		user: userID,
		year,
	};

	if (month) {
		matchState.month = month;
	}

	// Get the total of the budgets in specified period
	const totalBudget = await Budget.aggregate([
		{
			$match: matchState,
		},
		{
			$group: {
				_id: null,
				total: { $sum: "$amount" },
			},
		},
		{
			$project: {
				_id: 0,
				total: 1,
			},
		},
	]);

	// Get the total of the expenses in specified period
	let startDate, endDate;

	if (month) {
		startDate = new Date(year, month - 1, 1);
		endDate = new Date(year, month, 1);
	} else {
		startDate = new Date(year, 0, 1);
		endDate = new Date(year + 1, 0, 1);
	}

	const totalSpent = await Transaction.aggregate([
		{
			$match: {
				user: userID,
				type: "expense",
				date: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: { _id: null, total: { $sum: "$amount" } },
		},
		{
			$project: { _id: 0, total: 1 },
		},
	]);

	// Get the budgets grouped by category
	const budgets = await Budget.aggregate([
		{
			$match: {
				user: userID,
				year,
				...(month && { month }),
			},
		},
		{
			$group: {
				_id: "$category",
				budget: { $sum: "$amount" },
			},
		},
		{
			$lookup: {
				from: "categories",
				localField: "_id",
				foreignField: "_id",
				as: "category",
			},
		},
		{
			$unwind: "$category",
		},
	]);

	// Get category wise expenses
	const expenses = await Transaction.aggregate([
		{
			$match: {
				user: userID,
				date: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: {
				_id: "$category",
				spent: { $sum: "$amount" },
			},
		},
	]);

	const expenseMap = {};

	// Creating a Map to avoid nested loops
	expenses.forEach((expense) => {
		expenseMap[expense._id.toString()] = expense.spent;
	});

	const categories = budgets.map((budget) => {
		const spent = expenseMap[budget._id.toString()] || 0;
		const remaining = budget.budget - spent;
		const percentage = budget.budget
			? Number(((spent / budget.budget) * 100).toFixed(1))
			: 0;

		return {
			category: budget.category.name,
			budget: budget.budget,
			spent,
			remaining,
			percentage,
			status: spent > budget.budget ? "over" : "safe",
		};
	});

	return {
		totalBudget: totalBudget[0]?.total || 0,
		totalSpent: totalSpent[0]?.total || 0,
		categories,
	};
};
