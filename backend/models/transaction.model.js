import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please add a title'],
			trim: true,
			minlength: 5,
			maxlength: 100,
		},
		amount: {
			type: Number,
			required: [true, 'Please add an amount'],
		},
		type: {
			type: String,
			enum: ['income', 'expense'],
			required: [true, 'Please specify transaction type'],
		},
		category: {
			type: String,
			required: [true, 'Please add a category'],
		},
		date: {
			type: Date,
			required: [true, 'Please add a date'],
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Transaction', transactionSchema);
