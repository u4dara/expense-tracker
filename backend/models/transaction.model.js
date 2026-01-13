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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		date: {
			type: Date,
			required: [true, 'Please add a date'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
    deletedAt: {
      type: Date,
      default: null,
    }
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Transaction', transactionSchema);
