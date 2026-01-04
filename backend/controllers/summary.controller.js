import asyncHandler from 'express-async-handler';
import { getTransactionSummary } from '../services/expense.service.js';
import AppError from '../utils/appError.js';

//@desc    Get all time expenses
//@route   GET /api/v1/expenses/all
//@access  Private
export const getSummary = asyncHandler(async (req, res) => {
	const summary = await getTransactionSummary(req.user._id);

	if (!summary) {
		throw new AppError('Could not fetch summary', 500);
	}

	res.status(200).json({
		success: true,
		message: 'Summary fetched successfully',
		data: summary,
	});
});
