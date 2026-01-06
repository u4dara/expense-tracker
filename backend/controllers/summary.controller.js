import asyncHandler from "express-async-handler";
import {
	findAllTimeTransactionSummary,
	findCategoryWiseExpenses,
	findMonthOrYearSummary,
} from "../services/summary.service.js";
import AppError from "../utils/appError.js";

//@desc    Get total income, expenses and balance for all time
//@route   GET /api/v1/expenses/all
//@access  Private
export const getAllTimeTransactionSummary = asyncHandler(async (req, res) => {
	const summary = await findAllTimeTransactionSummary(req.user._id);

	if (!summary) {
		throw new AppError("Could not fetch summary", 500);
	}

	res.status(200).json({
		success: true,
		message: "Summary fetched successfully",
		data: summary,
	});
});

//@desc    Get total expenses for a month
//@route   GET /api/v1/expenses/month
//@access  Private
export const getMonthOrYearSummary = asyncHandler(async (req, res) => {
	const { year, month } = req.query;
	const numericYear = Number(year);

	if (!year || Number.isNaN(numericYear)) {
		throw new AppError("A Valid Year is required", 400);
	}

	const totalMonthSummary = await findMonthOrYearSummary(
		req.user._id,
		year,
		month,
	);

	res.status(200).json({
		success: true,
		message: "Expenses fetched successfully",
		data: {
			year: year,
			month: month || "all",
			totalTransactions: totalMonthSummary,
		},
	});
});

//@desc    Get total expenses for a month in category wise
//@route   GET /api/v1/expenses/category-wise
//@access  Private
export const getCategoryWiseExpenses = asyncHandler(async (req, res) => {
	const { year, month } = req.query;
  const numericYear = Number(year);

	if (!year || Number.isNaN(numericYear)) {
		throw new AppError("Year is required", 400);
	}

	const categoryWiseExpenses = await findCategoryWiseExpenses(
		req.user._id,
		year,
		month,
	);

	res.status(200).json({
		success: true,
		message: "Category wise expenses fetched successfully",
		data: {
			year: year,
			month: month || "all",
			categoryWiseExpenses: categoryWiseExpenses,
		},
	});
});
