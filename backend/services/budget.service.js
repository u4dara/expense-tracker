import Budget from "../models/budget.model.js";

export const findBudgets = async (userID, year, month) => {
	const matchState = {
		user: userID,
		year,
    deletedAt: null
	};

	if (month !== null) {
		matchState.month = month;
	}

	return await Budget.aggregate([
		{
			$match: matchState,
		},
		{
			$lookup: {
				from: "categories",
				localField: "category",
				foreignField: "_id",
				as: "categoryInfo",
			},
		},
		{
			$unwind: "$categoryInfo",
		},
		{
			$project: {
				_id: 1,
        title: 1,
				amount: 1,
				year: 1,
				month: 1,
				categoryID: "$categoryInfo._id",
				categoryName: "$categoryInfo.name",
				categoryType: "$categoryInfo.type",
				categoryColor: "$categoryInfo.color",
			},
		},
	]);
};
