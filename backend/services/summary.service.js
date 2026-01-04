import asyncHandler from 'express-async-handler';
import Transaction from '../models/transaction.model.js';

export const findAllTimeTransactionSummary = async (userID) => {
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
};

export const findMonthOrYearExpenses = async (userID, year, month) => {
	let startDate, endDate;
	const numberYear = Number(year);

	if (month) {
		startDate = new Date(year, month - 1, 1);
		endDate = new Date(year, month, 1);
	} else {
		startDate = new Date(year, 0, 1);
		endDate = new Date(numberYear + 1, 0, 1);
	}
	const result = await Transaction.aggregate([
		{
			$match: {
				user: userID,
				type: 'expense',
				date: { $gte: startDate, $lt: endDate },
			},
		},
		{
			$group: {
				_id: null,
				totalExpenses: { $sum: '$amount' },
			},
		},
	]);

	return result[0]?.totalExpenses || 0;
};
