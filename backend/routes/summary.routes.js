import { Router } from 'express';
import {
	getAllTimeTransactionSummary,
	getCategoryWiseExpenses,
	getMonthOrYearSummary,
} from '../controllers/summary.controller.js';
import protect from '../middlewares/auth.middleware.js';

const summaryRouter = Router();

summaryRouter.get('/all', protect, getAllTimeTransactionSummary);
summaryRouter.get('/month', protect, getMonthOrYearSummary);
summaryRouter.get('/category-wise', protect, getCategoryWiseExpenses);

export default summaryRouter;
