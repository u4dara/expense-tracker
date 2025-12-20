import colors from 'colors';
import express from 'express';

import { PORT } from './configs/env.js';
import transactionRouter from './routes/transaction.routes.js';

const app = express();

// Middlewares

// Routes
app.use('/api/v1/transaction', transactionRouter);

const startServer = () => {
	app.listen(PORT || 5500, () => {
		console.log(`Server is running on port ${PORT}`.yellow);
	});
};

startServer();
