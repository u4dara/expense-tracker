import asyncHandler from 'express-async-handler';
import Category from '../models/transaction.category.model.js';
import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';

//@desc    Get all transactions
//@route   GET /api/v1/transactions
//@access  Private
export const getTrasactions = asyncHandler(async (req, res) => {
	const allTransactions = await Transaction.find({ user: req.user._id }).sort({
		createdAt: -1,
	});
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
	const selectedCategory = await Category.findOne({
		name: category,
		user: req.user._id,
	});
	if (!selectedCategory) {
		throw new AppError('Category does not exist', 404);
	}
	const newTransaction = await Transaction.create({
		title,
		amount,
		type: selectedCategory.type,
		category: selectedCategory._id,
		date,
		user: req.user._id,
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
export const updateTransaction = asyncHandler(async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (!existingTransaction) {
		throw new AppError('Transaction not found', 404);
	}

	// Find whether user is logged in user
	const loggedInUser = req.user;
	if (!loggedInUser) {
		throw new AppError('User not found. Please Sign-in', 401);
	}

	// Check if the logged in user is the owner of the transaction
	if (existingTransaction.user.toString() !== loggedInUser._id.toString()) {
		throw new AppError('User not authorized to update this transaction', 403);
	}

	const { title, amount, category, date } = req.body;

	const updatedData = {
		title: title ?? existingTransaction.title,
		amount: amount ?? existingTransaction.amount,
		date: date ?? existingTransaction.date,
	};

	if (category) {
		const selectedCategory = await Category.findOne({
			name: category,
			user: req.user._id,
		});
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
});

//@desc    Delete a transaction
//@route   DELETE /api/v1/transactions/:id
//@access  Private
export const deleteTransaction = asyncHandler(async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (!existingTransaction) {
		throw new AppError('Transaction not found', 404);
	}

	// Find whether user is logged in user
	const loggedInUser = req.user;
	if (!loggedInUser) {
		throw new AppError('User not found. Please Sign-in', 401);
	}

	// Check if the logged in user is the owner of the transaction
	if (existingTransaction.user.toString() !== loggedInUser._id.toString()) {
		throw new AppError('User not authorized to update this transaction', 403);
	}

	const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
	res.status(200).json({
		success: true,
		message: 'Transaction deleted successfully',
		data: deletedTransaction,
	});
});
