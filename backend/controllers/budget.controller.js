import asyncHandler from "express-async-handler";
import Budget from "../models/budget.model.js";
import Category from "../models/category.model.js";
import { findBudgets } from "../services/budget.service.js";
import AppError from "../utils/appError.js";
import { numericValidation } from "../validations/budget.validations.js";

//@desc    Get the budget for a specified year
//@route   GET /api/v1/budgets
//@access  Private
export const getBudgets = asyncHandler(async (req, res) => {
	const { year, month } = req.query;
	const numericYear = Number(year);
	const numericMonth = month ? Number(month) : null;

	if (!year || Number.isNaN(numericYear)) {
		throw new AppError("A Valid Year is required", 400);
	}

	const budgets = await findBudgets(req.user._id, numericYear, numericMonth);

	res.status(200).json({
		success: true,
		message: "Budgets fetched successfully",
		data: {
			year: numericYear,
			month: month || "For year",
			budgets,
		},
	});
});

//@desc    Add a budget for a Category
//@route   POST /api/v1/budget
//@access  Private
export const addBudget = asyncHandler(async (req, res) => {
	const { title, category, amount, year, month } = req.body;
	if (!title || !category || !amount || !year) {
		throw new AppError("Please fill all the required fields", 400);
	}

	const numericAmount = Number(amount);
	const numericYear = Number(year);
	if (Number.isNaN(numericYear) || Number.isNaN(numericAmount)) {
		throw new AppError(
			"Year or Amount incorrect. Please provide valid details",
			400,
		);
	}

	if (month) {
		if (Number.isNaN(Number(month)))
			throw new AppError("Please provide a valid month number!", 400);
	}

	const existingCategory = await Category.findOne({
		user: req.user._id,
		name: category,
	});

	if (!existingCategory) {
		throw new AppError(
			"Selected Category was not found. Please select another one!",
			404,
		);
	}

	const existingBudget = await Budget.findOne({
		title: title,
		user: req.user._id,
		category: existingCategory,
		year: numericYear,
		month,
	});

	if (existingBudget) {
		throw new AppError(
			"Previously created Budget is already existing for this category and period",
			400,
		);
	}

	const newBudget = await Budget.create({
		title: title,
		user: req.user._id,
		category: existingCategory._id,
		amount: numericAmount,
		year: numericYear,
		month: month || null,
	});

	// Send data to logger middleware
	req.audit = {
		action: "create",
		entity: "Budget",
		entityID: newBudget._id,
		after: {
			title: newBudget.title,
			category: newBudget.category,
			amount: newBudget.amount,
			year: newBudget.year,
			month: newBudget.month,
		},
	};

	res.status(201).json({
		success: true,
		message: "Budget created successfully",
		data: newBudget,
	});
});

//@desc    Update a budget
//@route   PUT /api/v1/budgets/:id
//@access  Private
export const updateBudget = asyncHandler(async (req, res) => {
	const existingBudget = await Budget.findById(req.params.id);
	if (!existingBudget) {
		throw new AppError(
			"Selected Budget was not found. Please select another one!",
			404,
		);
	}

	// Find whether the logged in user is the owner of the budget
	if (req.user._id.toString() !== existingBudget.user.toString()) {
		throw new AppError("User not authorized to update this Budget", 403);
	}

	const { title, category, amount, year, month } = req.body;

	if (amount) {
		numericValidation(amount, "amount");
	}

	if (year) {
		numericValidation(year, "year");
	}

	if (month) {
		numericValidation(month, "month");
	}

	if (category) {
		const existingCategory = await Category.findOne({
			user: loggedUser._id,
			name: category,
			isArchived: { $ne: true },
		});

		if (!existingCategory) {
			throw new AppError(
				"Selected Category was not found. Please select another one!",
				404,
			);
		}
	}

	const updatedBudget = await Budget.findByIdAndUpdate(
		req.params.id,
		{
			title: title || existingBudget.title,
			category: category || existingBudget.category,
			amount: amount || existingBudget.amount,
			year: year || existingBudget.year,
			month: month || existingBudget.month,
		},
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "update",
		entity: "Budget",
		entityID: existingBudget._id,
		before: {
			title: existingBudget.title,
			category: existingBudget.category,
			amount: existingBudget.amount,
			year: existingBudget.year,
			month: existingBudget.month,
		},
		after: {
			title: updatedBudget.title,
			category: updatedBudget.category,
			amount: updatedBudget.amount,
			year: updatedBudget.year,
			month: updatedBudget.month,
		},
	};

	res.status(200).json({
		success: true,
		message: "Budget updated successfully",
		data: updatedBudget,
	});
});

//@desc    Soft-Delete a budget
//@route   DELETE /api/v1/budgets/:id
//@access  Private
export const softDeleteBudget = asyncHandler(async (req, res) => {
	const existingBudget = await Budget.findById(req.params.id);
	if (!existingBudget) {
		throw new AppError(
			"Selected Budget was not found. Please select another one!",
			404,
		);
	}

	// Find whether the logged-in user is the owner of the budget
	if (req.user._id.toString() !== existingBudget.user.toString()) {
		throw new AppError("User is not authorized to delete this Budget", 403);
	}

	const currentDate = new Date();

	const deletedBudget = await Budget.findByIdAndUpdate(
		req.params.id,
		{
			$set: { deletedAt: currentDate },
		},
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "soft-delete",
		entity: "Budget",
		entityID: existingBudget._id,
		before: {
			title: existingBudget.title,
			category: existingBudget.category,
			amount: existingBudget.amount,
			year: existingBudget.year,
			month: existingBudget.month,
			deletedAt: existingBudget.deletedAt,
		},
		after: {
			title: deletedBudget.title,
			category: deletedBudget.category,
			amount: deletedBudget.amount,
			year: deletedBudget.year,
			month: deletedBudget.month,
			deletedAt: deletedBudget.deletedAt,
		},
	};

	res.status(200).json({
		success: true,
		message: "Budget Soft-Deleted successfully",
		data: deletedBudget,
	});
});

//@desc    Get Soft-Deleted budgets
//@route   GET /api/v1/budget/bin
//@access  Private
export const getSoftDeletedBudgets = asyncHandler(async (req, res) => {
	const budgets = await Budget.find({
		user: req.user._id,
		deletedAt: { $ne: null },
	}).sort({ updatedAt: -1 });

	if (!budgets) throw new AppError("No any deleted budgets yet", 404);

	res.status(200).json({
		success: true,
		message: "Soft-Deleted Budgets successfully fetched",
		data: budgets,
	});
});

//@desc    Restore a Soft-Deleted budget
//@route   PUT /api/v1/budget/bin/:id
//@access  Private
export const restoreSoftDeletedBudget = asyncHandler(async (req, res) => {
	const existingBudget = await Budget.findById(req.params.id);
	if (existingBudget?.deletedAt === null) {
		throw new AppError(
			"Selected Budget was not found. Please select another one!",
			404,
		);
	}

	// Find whether the logged-in user is the owner of the budget
	if (req.user._id.toString() !== existingBudget.user.toString()) {
		throw new AppError("User is not authorized to delete this Budget", 403);
	}

	const restoredBudget = await Budget.findByIdAndUpdate(
		req.params.id,
		{
			$set: { deletedAt: null },
		},
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "restore",
		entity: "Budget",
		entityID: existingBudget._id,
		before: {
			title: existingBudget.title,
			category: existingBudget.category,
			amount: existingBudget.amount,
			year: existingBudget.year,
			month: existingBudget.month,
			deletedAt: existingBudget.deletedAt,
		},
		after: {
			title: restoredBudget.title,
			category: restoredBudget.category,
			amount: restoredBudget.amount,
			year: restoredBudget.year,
			month: restoredBudget.month,
			deletedAt: restoredBudget.deletedAt,
		},
	};

	res.status(200).json({
		success: true,
		message: "Budget Restored successfully",
		data: restoredBudget,
	});
});

//@desc    Permanent Delete a budget
//@route   DELETE /api/v1/budgets/bin/:id
//@access  Private
export const permanentDeleteBudget = asyncHandler(async (req, res) => {
	const existingBudget = await Budget.findById(req.params.id);
	if (!existingBudget) {
		throw new AppError(
			"Selected Budget was not found. Please select another one!",
			404,
		);
	}

	// Find whether the logged-in user is the owner of the budget
	if (req.user._id.toString() !== existingBudget.user.toString()) {
		throw new AppError("User is not authorized to delete this Budget", 403);
	}

	const deletedBudget = await Budget.findByIdAndDelete(req.params.id);

	// Send data to logger middleware
	req.audit = {
		action: "permanent-delete",
		entity: "Budget",
		entityID: existingBudget._id,
		before: {
			title: existingBudget.title,
			category: existingBudget.category,
			amount: existingBudget.amount,
			year: existingBudget.year,
			month: existingBudget.month,
		},
	};

	res.status(200).json({
		success: true,
		message: "Budget Permanently Deleted successfully",
		data: deletedBudget,
	});
});
