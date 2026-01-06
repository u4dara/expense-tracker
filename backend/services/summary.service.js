import Transaction from "../models/transaction.model.js";

export const findAllTimeTransactionSummary = async (userID) => {
	const result = await Transaction.aggregate([
		{ $match: { user: userID } },
		{ $group: { _id: "$type", total: { $sum: "$amount" } } },
	]);

	let totalExpenses = 0;
	let totalIncome = 0;

	result.forEach((item) => {
		if (item._id === "expense") totalExpenses = item.total;

		if (item._id === "income") totalIncome = item.total;
	});

	return {
		totalExpenses,
		totalIncome,
		balance: totalIncome - totalExpenses,
	};
};

export const findMonthOrYearSummary = async (userID, year, month) => {
	let startDate, endDate;

	if (month) {
		startDate = new Date(year, month - 1, 1);
		endDate = new Date(year, month, 1);
	} else {
		startDate = new Date(year, 0, 1);
		endDate = new Date(year + 1, 0, 1);
	}
	const result = await Transaction.aggregate([
		{
			$match: {
				user: userID,
				date: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: {
				_id: "$type",
				total: { $sum: "$amount" },
			},
		},
	]);

	let totalExpenses = 0;
	let totalIncome = 0;

	result.forEach((item) => {
		if (item._id === "expense") totalExpenses = item.total;

		if (item._id === "income") totalIncome = item.total;
	});

	return {
		totalExpenses,
		totalIncome,
	};
};

export const findCategoryWiseExpenses = async (userID, year, month) => {
	let startDate, endDate;

	if (month) {
		startDate = new Date(year, month - 1, 1);
		endDate = new Date(year, month, 1);
	} else {
		startDate = new Date(year, 0, 1);
		endDate = new Date(year + 1, 0, 1);
	}

	return await Transaction.aggregate([
		{
			$match: {
				user: userID,
				type: "expense",
				date: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: {
				_id: "$category",
				totalExpense: { $sum: "$amount" },
			},
		},
		{
			$lookup: {
				from: "transactioncategories",
				localField: "_id",
				foreignField: "_id",
				as: "category",
			},
		},
		{
			$unwind: "$category",
		},
		{
			$project: {
				_id: 0,
				categoryID: "$_id",
				categoryName: "$category.name",
				totalExpense: 1,
			},
		},
	]);
};
