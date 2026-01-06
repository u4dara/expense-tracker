import asyncHandler from "express-async-handler";
import Budget from "../models/budget.model.js";
import Category from "../models/category.model.js";
import { findBudgets } from "../services/budget.service.js";
import AppError from "../utils/appError.js";

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
	if (Number.isNaN(numericYear)) {
		throw new AppError("Please add a valid year", 400);
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
		year,
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
		amount,
		year,
		month,
	});

	res.status(201).json({
		success: true,
		message: "Budget created successfully",
		data: newBudget,
	});
});
