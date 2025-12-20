import colors from 'colors';
import express from 'express';

import { PORT } from './configs/env.js';

const app = express();

const startServer = () => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`.yellow);
	});
};

startServer();
