import asyncHandler from "express-async-handler";
import { findBudgetVsExpenseUsage } from "../services/budgetUsage.service.js";
import AppError from "../utils/appError.js";

export const getBudgetVsExpenseUsage = asyncHandler(async (req, res) => {
	const { year, month } = req.query;

	const numericYear = Number(year);
	const numericMonth = month ? Number(month) : null;

	if (!year || Number.isNaN(numericYear)) {
		throw new AppError("Provided Year is incorrect. Please provide a valid year!", 400);
	}

	const budgetVsExpenseUsage = await findBudgetVsExpenseUsage(
		req.user._id,
		numericYear,
		numericMonth,
	);

	res.status(200).json({
		success: true,
		message: "Budget vs Expense usage data fetched successfully",
		data: {
			year: year,
			month: month || "for year",
			summary: budgetVsExpenseUsage,
		},
	});
});
