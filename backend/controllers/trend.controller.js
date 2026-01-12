import asyncHandler from "express-async-handler";
import { findMonthlyExpenseTrends } from "../services/trend.service.js";
import AppError from "../utils/appError.js";

//@desc    Get total expenses for each month in a year
//@route   GET /api/v1/trends/monthly
//@access  Private
export const getMonthlyExpenseTrends = asyncHandler(async (req, res) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const { year } = req.query;
	const numericYear = Number(year);

	if (!year || Number.isNaN(numericYear)) {
		throw new AppError("Please provide a valid Year!", 400);
	}

	const expenseTrends = await findMonthlyExpenseTrends(
		req.user._id,
		numericYear,
	);

	// Create lookup map
	const expenseMap = {};
	expenseTrends.forEach((item) => {
		expenseMap[item.month] = item.total;
	});

	// Fill missing months with 0
	const normalizedTrends = Array.from({ length: 12 }, (_, index) => {
		const monthNumber = index + 1;
		return {
			month: monthNames[index],
			total: expenseMap[monthNumber] || 0,
		};
	});

	res.status(200).json({
		success: true,
		message: "Monthly expense trends fetched successfully",
		data: normalizedTrends,
	});
});
