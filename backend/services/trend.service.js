import Transaction from "../models/transaction.model.js";

export const findMonthlyExpenseTrends = async (userID, year) => {
	const startDate = new Date(year, 0, 1);
	const endDate = new Date(year + 1, 0, 1);

	const result = await Transaction.aggregate([
		{
			$match: {
				user: userID,
				type: "expense",
				date: {
					$gte: startDate,
					$lt: endDate,
				},
			},
		},
		{
			$group: {
				_id: { $month: "$date" },
				total: { $sum: "$amount" },
			},
		},
		{
			$project: {
				_id: 0,
				month: "$_id",
				total: 1,
			},
		},
    {
      $sort: { month: 1 }
    }
	]);

	return result;
};
