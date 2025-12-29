import { Router } from 'express';
import {
	addCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from '../controllers/transaction.category.controller.js';

const transactionCategoryRouter = Router();

transactionCategoryRouter.route('/').get(getAllCategories).post(addCategory);
transactionCategoryRouter
	.route('/:id')
	.put(updateCategory)
	.delete(deleteCategory);

export default transactionCategoryRouter;
