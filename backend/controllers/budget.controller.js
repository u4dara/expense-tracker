import asyncHandler from "express-async-handler";
import Budget from "../models/budget.model.js";
import Category from "../models/category.model.js";
import { findBudgets } from "../services/budget.service.js";
import AppError from "../utils/appError.js";
import { numericValidation } from "../validations/budget.validations.js";

//@desc    Get the budget for a specified year
//@route   GET /api/v1/budget
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
		message: "Category Budgets fetched successfully",
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
	const { category, amount, year, month } = req.body;
	if (!category || !amount || !year) {
		throw new AppError("Please fill all the fields", 400);
	}

	const numericYear = Number(year);
	const numericAmount = Number(amount);
	if (Number.isNaN(numericYear) || Number.isNaN(numericAmount)) {
		throw new AppError("Please add valid details", 400);
	}

	const existingCategory = await Category.findOne({
		user: req.user._id,
		name: category,
	});

	if (!existingCategory) {
		throw new AppError("Category does not exist", 400);
	}

	const existingBudget = await Budget.findOne({
		user: req.user._id,
		category: existingCategory,
		year: numericYear,
		month,
	});

	if (existingBudget) {
		throw new AppError(
			"Budget is already existing for this category and period",
			400,
		);
	}

	const newBudget = await Budget.create({
		user: req.user._id,
		category: existingCategory._id,
		amount: numericAmount,
		year: numericYear,
		month,
	});

	res.status(201).json({
		success: true,
		message: "Budget created successfully",
		data: newBudget,
	});
});

//@desc    Update a budget
//@route   PUT /api/v1/budget/:id
//@access  Private
export const updateBudget = asyncHandler(async (req, res) => {
	const existingBudget = await Budget.findById(req.params.id);
	if (!existingBudget) {
		throw new AppError("Budget not found", 404);
	}

	// Find whether user is logged in
	const loggedUser = req.user;
	if (!loggedUser) {
		throw new AppError("User not found. Please Sign-in", 401);
	}

	// Find whether the logged in user is the owner of the budget
	if (loggedUser._id.toString() !== existingBudget.user.toString()) {
		throw new AppError("User not authorized to update this category", 403);
	}

	const { category, amount, year, month } = req.body;

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
		});

		if (!existingCategory) {
			throw new AppError("Existing category not found", 404);
		}
	}

	const updatedBudget = await Budget.findByIdAndUpdate(
		req.params.id,
		{
			category: category || existingBudget.category,
			amount: amount || existingBudget.amount,
			year: year || existingBudget.year,
			month: month || existingBudget.month,
		},
		{ new: true },
	);

	res.status(200).json({
		success: true,
		message: "Budget updated successfully",
		data: updatedBudget,
	});
});

//@desc    Delete a budget
//@route   DELETE /api/v1/budget/:id
//@access  Private
export const deleteBudget = asyncHandler(async (req, res) => {
	const existingBudget = await Budget.findById(req.params.id);
	if (!existingBudget) {
		throw new AppError("Budget not found", 404);
	}

	// Find whether the user is logged in
	const loggedUser = req.user;
	if (!loggedUser) {
		throw new AppError("User not found. Please Sign-in", 401);
	}

	// Find whether the logged-in user is the owner of the budget
	if (loggedUser._id.toString() !== existingBudget.user.toString()) {
		throw new AppError("User not authorized to update this category", 403);
	}

	const deletedBudget = await Budget.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		message: "Budget deleted successfully",
		data: deletedBudget,
	});
});

//@desc    Delete a budget
//@route   DELETE /api/v1/budget/:id
//@access  Private
