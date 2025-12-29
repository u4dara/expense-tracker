import asyncHandler from 'express-async-handler';
import { transactions } from '../database/transactionSampleData.js';
import Category from '../models/transaction.category.model.js';
import Transaction from '../models/transaction.model.js';
import AppError from '../utils/appError.js';

//@desc    Get all transactions
//@route   GET /api/v1/transactions
//@access  Private
export const getTrasactions = asyncHandler(async (req, res) => {
	res.status(200).json({ success: true, data: transactions });
});

//@desc    Add a new transaction
//@route   POST /api/v1/transactions
//@access  Private
export const addTransaction = asyncHandler(async (req, res) => {
	const { title, amount, category, date } = req.body;
	if (!title || !amount || !category || !date) {
		throw new AppError('Please add all fields', 400);
	}
	const selectedCategory = await Category.findOne({ title });
	if (!selectedCategory) {
		res
			.status(400)
			.json({ success: false, message: 'Category does not exist' });
	}

	const newTransaction = await Transaction.create({
		title,
		amount,
		category: selectedCategory._id,
		type: selectedCategory.type,
		date,
	});
	res.status(201).json({
		success: true,
		message: 'Transaction added successfully',
		data: newTransaction,
	});
});

//@desc    Delete a transaction
//@route   DELETE /api/v1/transactions/:id
//@access  Private
export const deleteTransaction = async (req, res) => {
	res.status(200).json({
		success: true,
		message: `Transaction ${req.params.id} deleted successfully`,
	});
};

//@desc    Update a transaction
//@route   PUT /api/v1/transactions/:id
//@access  Private
export const updateTransaction = async (req, res) => {
	res.status(200).json({
		success: true,
		message: `Transaction ${req.params.id} updated successfully`,
	});
};
