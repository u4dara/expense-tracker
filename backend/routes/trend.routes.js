import { Router } from 'express';
import { getMonthlyExpenseTrends } from '../controllers/trend.controller.js';
import protect from '../middlewares/auth.middleware.js';

const trendRouter = Router();

trendRouter.get('/monthly', protect, getMonthlyExpenseTrends);

export default trendRouter;
