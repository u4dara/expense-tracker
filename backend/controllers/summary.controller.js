import asyncHandler from 'express-async-handler';
import {
	findAllTimeTransactionSummary,
	findMonthOrYearExpenses,
} from '../services/summary.service.js';
import AppError from '../utils/appError.js';

//@desc    Get total income, expenses and balance for all time
//@route   GET /api/v1/expenses/all
//@access  Private
export const getAllTimeTransactionSummary = asyncHandler(async (req, res) => {
	const summary = await findAllTimeTransactionSummary(req.user._id);

	if (!summary) {
		throw new AppError('Could not fetch summary', 500);
	}

	res.status(200).json({
		success: true,
		message: 'Summary fetched successfully',
		data: summary,
	});
});

//@desc    Get total expenses for a month
//@route   GET /api/v1/expenses/month
//@access  Private
export const getMonthOrYearExpenses = asyncHandler(async (req, res) => {
	const { year, month } = req.body;

	if (!year) throw new AppError('Year is required', 400);

	const totalMonthExpenses = await findMonthOrYearExpenses(
		req.user._id,
		year,
		month,
	);

	res.status(200).json({
		success: true,
		message: 'Expenses fetched successfully',
		data: {
			year: year,
			month: month || 'all',
			totalExpenses: totalMonthExpenses,
		},
	});
});
