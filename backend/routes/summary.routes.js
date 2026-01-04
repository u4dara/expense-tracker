import { Router } from 'express';
import { getSummary } from '../controllers/summary.controller.js';
import protect from '../middlewares/auth.middleware.js';

const summaryRouter = Router();

summaryRouter.get('/all', protect, getSummary);

export default summaryRouter;
