import { Router } from 'express';
import {
	addCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from '../controllers/transaction.category.controller.js';
import protect from '../middlewares/auth.middleware.js';

const transactionCategoryRouter = Router();

transactionCategoryRouter
	.route('/')
	.get(protect, getAllCategories)
	.post(protect, addCategory);
transactionCategoryRouter
	.route('/:id')
	.put(protect, updateCategory)
	.delete(protect, deleteCategory);

export default transactionCategoryRouter;
