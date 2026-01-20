import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
	{
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50
    },
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
    deletedAt: {
      type: Date,
      default: null,
    }
	},
	{ timestamps: true },
);

export default mongoose.model("Budget", BudgetSchema);
