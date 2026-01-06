import mongoose from "mongoose";

const transactionCategoryBudgetSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Category",
		},
		amount: {
			type: Number,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		month: {
			type: Number,
			default: null,
		},
	},
	{ timestamps: true },
);

export default mongoose.model(
	"CategoryBudget",
	transactionCategoryBudgetSchema,
);
