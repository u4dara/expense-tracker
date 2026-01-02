import mongoose from 'mongoose';

const transactionCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a category name'],
			trim: true,
			minlength: 3,
			maxlength: 50,
			unique: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		type: {
			type: String,
			enum: ['income', 'expense'],
			required: [true, 'Please add a category type'],
		},
		color: {
			type: String,
			default: '#aac0e3',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('TransactionCategory', transactionCategorySchema);
