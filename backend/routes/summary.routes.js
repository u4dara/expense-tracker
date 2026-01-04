import { Router } from 'express';
import {
	getAllTimeTransactionSummary,
	getMonthOrYearExpenses,
} from '../controllers/summary.controller.js';
import protect from '../middlewares/auth.middleware.js';

const summaryRouter = Router();

summaryRouter.get('/all', protect, getAllTimeTransactionSummary);
summaryRouter.get('/month', protect, getMonthOrYearExpenses);

export default summaryRouter;
