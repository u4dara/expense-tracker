import asyncHandler from 'express-async-handler';
import { transactions } from '../database/transactionSampleData.js';
import Category from '../models/transaction.category.model.js';
import Transaction from '../models/transaction.model.js';
import AppError from '../utils/appError.js';

//@desc    Get all transactions
//@route   GET /api/v1/transactions
//@access  Private
export const getTrasactions = asyncHandler(async (req, res) => {
	const allTransactions = await Transaction.find().sort({ createdAt: -1 });
	res.status(200).json({ success: true, data: allTransactions });
});

//@desc    Add a new transaction
//@route   POST /api/v1/transactions
//@access  Private
export const addTransaction = asyncHandler(async (req, res) => {
	const { title, amount, category, date } = req.body;
	if (!title || !amount || !category || !date) {
		throw new AppError('Please add all fields', 400);
	}
	const selectedCategory = await Category.findOne({ name: category });
	if (!selectedCategory) {
		throw new AppError('Category does not exist', 404);
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

//@desc    Update a transaction
//@route   PUT /api/v1/transactions/:id
//@access  Private
export const updateTransaction = async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (!existingTransaction) {
		throw new AppError('Transaction not found', 404);
	}
	const { title, amount, category, date } = req.body;

	const updatedData = {
		title: title ?? existingTransaction.title,
		amount: amount ?? existingTransaction.amount,
		date: date ?? existingTransaction.date,
	};

	if (category) {
		const selectedCategory = await Category.findOne({ name: category });
		if (!selectedCategory) {
			throw new AppError('Category does not exist', 404);
		}
		updatedData.category = selectedCategory._id;
		updatedData.type = selectedCategory.type;
	}

	const updatedTransaction = await Transaction.findByIdAndUpdate(
		req.params.id,
		updatedData,
		{ new: true },
	);
	res.status(200).json({
		success: true,
		message: 'Transaction updated successfully',
		data: updatedTransaction,
	});
};

//@desc    Delete a transaction
//@route   DELETE /api/v1/transactions/:id
//@access  Private
export const deleteTransaction = async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (!existingTransaction) {
		throw new AppError('Transaction not found', 404);
	}

	const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
	res.status(200).json({
		success: true,
		message: 'Transaction deleted successfully',
		data: deletedTransaction,
	});
};
