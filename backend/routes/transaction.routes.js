import { Router } from 'express';
import {
	addTransaction,
	deleteTransaction,
	getTrasactions,
	updateTransaction,
} from '../controllers/transaction.controller.js';
import protect from '../middlewares/auth.middleware.js';

const transactionRouter = Router();

transactionRouter
	.route('/')
	.get(protect, getTrasactions)
	.post(protect, addTransaction);
transactionRouter
	.route('/:id')
	.put(protect, updateTransaction)
	.delete(protect, deleteTransaction);

export default transactionRouter;
