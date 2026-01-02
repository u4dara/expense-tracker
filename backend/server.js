import colors from 'colors';
import express from 'express';

import { PORT } from './configs/env.js';
import connectToDatabase from './database/mongodb.js';
import errorHandler from './middlewares/error.Handler.Middleware.js';
import authRouter from './routes/auth.routes.js';
import transactionCategoryRouter from './routes/transaction.category.routes.js';
import transactionRouter from './routes/transaction.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/categories', transactionCategoryRouter);
app.use('/api/v1/auth', authRouter);

// Error Handler Middleware
app.use(errorHandler);

const startServer = async () => {
	await connectToDatabase();
	app.listen(PORT || 5500, () => {
		console.log(`Server is running on port ${PORT}`.yellow);
	});
};

startServer();
