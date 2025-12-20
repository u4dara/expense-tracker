import { Router } from 'express';

import {
	addTransaction,
	deleteTransaction,
	getTrasactions,
	updateTransaction,
} from '../controllers/transaction.controller.js';

const transactionRouter = Router();

transactionRouter.route('/').get(getTrasactions).post(addTransaction);
transactionRouter
	.route('/:id')
	.put(updateTransaction)
	.delete(deleteTransaction);

export default transactionRouter;
