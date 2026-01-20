import asyncHandler from "express-async-handler";
import Category from "../models/category.model.js";
import AppError from "../utils/appError.js";

//@desc    Get all categories
//@route   GET /api/v1/categories
//@access  Private
export const getAllCategories = asyncHandler(async (req, res) => {
	const activeCategories = await Category.find({
		user: req.user._id,
		isArchived: false,
	}).sort({
		createdAt: -1,
	});
	const archivedCategories = await Category.find({
		user: req.user._id,
		isArchived: true,
	}).sort({
		createdAt: -1,
	});
	res.status(200).json({
		success: true,
		data: {
			active: activeCategories,
			archived: archivedCategories,
		},
	});
});

//@desc    Add new category
//@route   POST /api/v1/categories
//@access  Private
export const addCategory = asyncHandler(async (req, res) => {
	const { name, type, color } = req.body;
	if (!name || !type) {
		throw new AppError("Please provide all the details", 400);
	}

	const existingCategory = await Category.findOne({ name });
	if (existingCategory) {
		throw new AppError(
			"Previously created Category is already existing for this category and period",
			400,
		);
	}

	const newCategory = await Category.create({
		name,
		user: req.user._id,
		type,
		color: color || "#aac0e3",
	});

	// Send data to logger middleware
	req.audit = {
		action: "create",
		entity: "Category",
		entityID: newCategory._id,
		after: {
			name: newCategory.name,
			type: newCategory.type,
			color: newCategory.color,
		},
	};

	res.status(201).json({
		success: true,
		message: "Category added successfully",
		data: newCategory,
	});
});

//@desc    Update a category
//@route   PUT /api/v1/categories/:id
//@access  Private
export const updateCategory = asyncHandler(async (req, res) => {
	const existingCategory = await Category.findById(req.params.id);
	if (existingCategory?.isArchived === true) {
		throw new AppError(
			"Selected Category was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the category
	if (existingCategory.user.toString() !== req.user._id.toString()) {
		throw new AppError("User is not authorized to update this Category.", 403);
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

	// Send data to logger middleware
	req.audit = {
		action: "update",
		entity: "Category",
		entityID: existingCategory._id,
		before: {
			name: existingCategory.name,
			type: existingCategory.type,
			color: existingCategory.color,
		},
		after: {
			name: updatedCategory.name,
			type: updatedCategory.type,
			color: updatedCategory.color,
		},
	};

	res.status(200).json({
		success: true,
		message: "Category updated successfully",
		data: updatedCategory,
	});
});

//@desc    Archive a category
//@route   PUT /api/v1/categories/archive/:id
//@access  Private
export const archiveCategory = asyncHandler(async (req, res) => {
	const existingCategory = await Category.findById(req.params.id);
	if (existingCategory?.isArchived === true) {
		throw new AppError(
			"Selected Category was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the category
	if (existingCategory.user.toString() !== req.user._id.toString()) {
		throw new AppError("User is not authorized to update this Category.", 403);
	}

	const archivedCategory = await Category.findByIdAndUpdate(
		req.params.id,
		{ $set: { isArchived: true } },
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "archive",
		entity: "Category",
		entityID: existingCategory._id,
		before: {
			name: existingCategory.name,
			type: existingCategory.type,
			color: existingCategory.color,
			isArchived: existingCategory.isArchived,
		},
		after: {
			name: archivedCategory.name,
			type: archivedCategory.type,
			color: archivedCategory.color,
			isArchived: archivedCategory.isArchived,
		},
	};

	res.status(200).json({
		success: true,
		message: "Category Archived successfully",
		data: archivedCategory,
	});
});

//@desc    Unarchive a category
//@route   PUT /api/v1/categories/unarchive/:id
//@access  Private
export const unArchiveCategory = asyncHandler(async (req, res) => {
	const existingCategory = await Category.findById(req.params.id);
	if (existingCategory?.isArchived === false) {
		throw new AppError(
			"Selected Category was not found. Please select another one!",
			404,
		);
	}

	// Check if the logged in user is the owner of the category
	if (existingCategory.user.toString() !== req.user._id.toString()) {
		throw new AppError("User is not authorized to update this Category.", 403);
	}

	const unArchivedCategory = await Category.findByIdAndUpdate(
		req.params.id,
		{ $set: { isArchived: false } },
		{ new: true },
	);

	// Send data to logger middleware
	req.audit = {
		action: "unarchive",
		entity: "Category",
		entityID: existingCategory._id,
		before: {
			name: existingCategory.name,
			type: existingCategory.type,
			color: existingCategory.color,
			isArchived: existingCategory.isArchived,
		},
		after: {
			name: unArchivedCategory.name,
			type: unArchivedCategory.type,
			color: unArchivedCategory.color,
			isArchived: unArchivedCategory.isArchived,
		},
	};

	res.status(200).json({
		success: true,
		message: "Category Unarchived successfully",
		data: unArchivedCategory,
	});
});

//@desc    Delete a category
//@route   DELETE /api/v1/categories/:id
//@access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
	const existingCategory = await Category.findById(req.params.id);
	if (!existingCategory) {
		throw new AppError(
			"Selected Category was not found. Please select another one!",
			404,
		);
	}

	// Find whether user is logged in user
	const loggedInUser = req.user;
	if (!loggedInUser) {
		throw new AppError("Logged in User was not found. Please Sign-in", 401);
	}

	// Check if the logged in user is the owner of the category
	if (existingCategory.user.toString() !== req.user._id.toString()) {
		throw new AppError("User is not authorized to update this Category", 403);
	}
	await Category.findByIdAndDelete(req.params.id);

	// Send data to logger middleware
	req.audit = {
		action: "permanent-delete",
		entity: "Category",
		entityID: existingCategory._id,
		before: {
			name: existingCategory.name,
			type: existingCategory.type,
			color: existingCategory.color,
		},
	};

	res.status(200).json({
		success: true,
		message: "Category deleted successfully",
	});
});
