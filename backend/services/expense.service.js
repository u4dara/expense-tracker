import asyncHandler from 'express-async-handler';
import Transaction from '../models/transaction.model.js';

export const getTransactionSummary = asyncHandler(async (userID) => {
	const result = await Transaction.aggregate([
		{ $match: { user: userID } },
		{ $group: { _id: '$type', total: { $sum: '$amount' } } },
	]);

	let totalExpenses = 0;
	let totalIncome = 0;

	result.forEach((item) => {
		if (item._id === 'expense') totalExpenses = item.total;

		if (item._id === 'income') totalIncome = item.total;
	});

	return {
		totalExpenses,
		totalIncome,
		balance: totalIncome - totalExpenses,
	};
});
