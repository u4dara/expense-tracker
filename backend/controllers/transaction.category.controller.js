import asyncHandler from 'express-async-handler';
import Category from '../models/transaction.category.model.js';
import AppError from '../utils/appError.js';

//@desc    Get all categories
//@route   GET /api/v1/categories
//@access  Private
export const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find().sort({ createdAt: -1 });
	res.status(200).json({ success: true, data: categories });
});

//@desc    Add new category
//@route   POST /api/v1/categories
//@access  Private
export const addCategory = asyncHandler(async (req, res) => {
	const { name, type, color } = req.body;
	if (!name || !type) {
		throw new AppError('Please add all fields', 400);
	}

	const existingCategory = await Category.findOne({ name });
	if (existingCategory) {
		throw new AppError('Category already exists', 400);
	}

	const newCategory = await Category.create({
		name,
		type,
		color,
	});
	res.status(201).json({
		success: true,
		message: 'Category added successfully',
		data: newCategory,
	});
});

//@desc    Update a category
//@route   PUT /api/v1/categories/:id
//@access  Private
export const updateCategory = asyncHandler(async (req, res) => {
	const existingCategory = await Category.findById(req.params.id);
	if (!existingCategory) {
		throw new AppError('Category not found', 404);
	}
	const { name, type, color } = req.body;
	const updatedCategory = await Category.findByIdAndUpdate(
		req.params.id,
		{
			name: name || existingCategory.name,
			type: type || existingCategory.type,
			color: color || existingCategory.color,
		},
		{ new: true },
	);
	res.status(200).json({
		success: true,
		message: 'Category updated successfully',
		data: updatedCategory,
	});
});

//@desc    Delete a category
//@route   DELETE /api/v1/categories/:id
//@access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
	const existingCategory = await Category.findById(req.params.id);
	if (!existingCategory) {
		throw new AppError('Category not found', 404);
	}
	await Category.findByIdAndDelete(req.params.id);
	res.status(200).json({
		success: true,
		message: 'Category deleted successfully',
	});
});
