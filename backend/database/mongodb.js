import colors from 'colors';
import mongoose from 'mongoose';

import { MONGODB_URI, NODE_ENV } from '../configs/env.js';

if (!MONGODB_URI) {
	throw new Error('MongoDB URI is missing');
}

const connectToDatabase = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log(
			`Successfully connected to Database in ${colors.magenta(`${NODE_ENV}`)}`
				.yellow,
		);
	} catch (error) {
		console.error('Error connecting to Database!!!'.red);
		console.error(error);
		process.exit(1);
	}
};

export default connectToDatabase;
