import asyncHandler from "express-async-handler";
import Category from "../models/category.model.js";
import Transaction from "../models/transaction.model.js";
import AppError from "../utils/appError.js";

//@desc    Get all transactions
//@route   GET /api/v1/transactions
//@access  Private
export const getTransactions = asyncHandler(async (req, res) => {
	const allTransactions = await Transaction.find({
		user: req.user._id,
		deletedAt: null,
	}).sort({
		date: -1,
	});
	res.status(200).json({ success: true, data: allTransactions });
});

//@desc    Add a new transaction
//@route   POST /api/v1/transactions
//@access  Private
export const addTransaction = asyncHandler(async (req, res) => {
	const { title, amount, category, date } = req.body;
	if (!title || !amount || !category) {
		throw new AppError("Please provide all the details", 400);
	}

	const currentDate = new Date();

	const selectedCategory = await Category.findOne({
		name: category,
		user: req.user._id,
	});
	if (!selectedCategory) {
		throw new AppError(
			"Selected Category was not found. Please select another one!",
			404,
		);
	}
	const newTransaction = await Transaction.create({
		title,
		amount,
		type: selectedCategory.type,
		category: selectedCategory._id,
		date: date || currentDate,
		user: req.user._id,
	});

	// Send data to logger middleware
	req.audit = {
		action: "create",
		entity: "Transaction",
		entityID: newTransaction._id,
		after: {
			title: newTransaction.title,
			amount: newTransaction.amount,
			type: newTransaction.type,
			category: newTransaction.category,
			date: newTransaction.date,
		},
	};

	res.status(201).json({
		success: true,
		message: "Transaction added successfully",
		data: newTransaction,
	});
});

//@desc    Update a transaction
//@route   PUT /api/v1/transactions/:id
//@access  Private
export const updateTransaction = asyncHandler(async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (existingTransaction?.deletedAt !== null) {
		throw new AppError(
			"Selected Transaction was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the transaction
	if (existingTransaction.user.toString() !== req.user._id.toString()) {
		throw new AppError("User not authorized to update this transaction", 403);
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
			throw new AppError(
				"Selected Category was not found. Please select another one!",
				404,
			);
		}
		updatedData.category = selectedCategory._id;
		updatedData.type = selectedCategory.type;
	}

	const updatedTransaction = await Transaction.findByIdAndUpdate(
		req.params.id,
		updatedData,
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "update",
		entity: "Transaction",
		entityID: existingTransaction._id,
		before: {
			title: existingTransaction.title,
			amount: existingTransaction.amount,
			type: existingTransaction.type,
			category: existingTransaction.category,
			date: existingTransaction.date,
			deletedAt: existingTransaction.deletedAt,
		},
		after: {
			title: updatedTransaction.title,
			amount: updatedTransaction.amount,
			type: updatedTransaction.type,
			category: updatedTransaction.category,
			date: updatedTransaction.date,
			deletedAt: updatedTransaction.deletedAt,
		},
	};

	res.status(200).json({
		success: true,
		message: "Transaction updated successfully",
		data: updatedTransaction,
	});
});

//@desc    Soft Delete a transaction
//@route   DELETE /api/v1/transactions/:id
//@access  Private
export const softDeleteTransaction = asyncHandler(async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (existingTransaction?.deletedAt !== null) {
		throw new AppError(
			"Selected Transaction was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the transaction
	if (existingTransaction.user.toString() !== req.user._id.toString()) {
		throw new AppError(
			"User is not authorized to update this Transaction",
			403,
		);
	}

	const currentDate = new Date();

	const deletedTransaction = await Transaction.findByIdAndUpdate(
		req.params.id,
		{ $set: { deletedAt: currentDate } },
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "soft-delete",
		entity: "Transaction",
		entityID: existingTransaction._id,
		before: {
			title: existingTransaction.title,
			amount: existingTransaction.amount,
			type: existingTransaction.type,
			category: existingTransaction.category,
			date: existingTransaction.date,
			deletedAt: existingTransaction.deletedAt,
		},
		after: {
			title: deletedTransaction.title,
			amount: deletedTransaction.amount,
			type: deletedTransaction.type,
			category: deletedTransaction.category,
			date: deletedTransaction.date,
			deletedAt: deletedTransaction.deletedAt,
		},
	};

	res.status(200).json({
		success: true,
		message: "Transaction Soft-Deleted successfully",
		data: deletedTransaction,
	});
});

//@desc    Get the Soft-Deleted transactions
//@route   GET /api/v1/transactions/bin
//@access  Private
export const getSoftDeletedTransactions = asyncHandler(async (req, res) => {
	const transactions = await Transaction.find({
		user: req.user._id,
		deletedAt: { $ne: null },
	}).sort({ updatedAt: -1 });

	if (!transactions) throw new AppError("No any deleted transactions yet", 404);

	res.status(200).json({
		success: true,
		message: "Soft-Deleted Transactions successfully fetched",
		data: transactions,
	});
});

//@desc    Restore a Soft-Deleted transaction
//@route   PUT /api/v1/transactions/bin/:id
//@access  Private
export const restoreSoftDeletedTransaction = asyncHandler(async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (existingTransaction?.deletedAt === null) {
		throw new AppError(
			"Selected Transaction was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the transaction
	if (existingTransaction.user.toString() !== req.user._id.toString()) {
		throw new AppError(
			"User is not authorized to update this Transaction",
			403,
		);
	}

	const restoredTransaction = await Transaction.findByIdAndUpdate(
		req.params.id,
		{
			$set: { deletedAt: null },
		},
		{ new: true },
	);

	req.audit = {
		action: "restore",
		entity: "Transaction",
		entityID: existingTransaction._id,
		before: {
			title: existingTransaction.title,
			amount: existingTransaction.amount,
			type: existingTransaction.type,
			category: existingTransaction.category,
			date: existingTransaction.date,
			deletedAt: existingTransaction.deletedAt,
		},
		after: {
			title: restoredTransaction.title,
			amount: restoredTransaction.amount,
			type: restoredTransaction.type,
			category: restoredTransaction.category,
			date: restoredTransaction.date,
			deletedAt: restoredTransaction.deletedAt,
		},
	};

	res.status(200).json({
		success: true,
		message: "Transaction Restored successfully",
		data: restoredTransaction,
	});
});

//@desc    Permanently Delete a transaction
//@route   DELETE /api/v1/transactions/bin/:id
//@access  Private
export const permanentDeleteTransaction = asyncHandler(async (req, res) => {
	const existingTransaction = await Transaction.findById(req.params.id);
	if (existingTransaction?.deletedAt === null) {
		throw new AppError(
			"Selected Transaction was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the transaction
	if (existingTransaction.user.toString() !== req.user._id.toString()) {
		throw new AppError(
			"User is not authorized to update this Transaction",
			403,
		);
	}

	const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

	// Send data to logger middleware
	req.audit = {
		action: "permanent-delete",
		entity: "Transaction",
		entityID: existingTransaction._id,
		before: {
			title: existingTransaction.title,
			amount: existingTransaction.amount,
			type: existingTransaction.type,
			category: existingTransaction.category,
			date: existingTransaction.date,
		},
	};

	res.status(200).json({
		success: true,
		message: "Transaction Permanently Deleted successfully",
		data: deletedTransaction,
	});
});
