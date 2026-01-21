import colors from "colors";
import mongoose from "mongoose";
import { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } from "../configs/env.js";

if (!MONGODB_URI && !MONGODB_URI_TEST) {
	throw new Error("MongoDB URI is missing!!");
}

const connectToDatabase = async () => {
	const mongoURI =
		process.env.NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI;
	try {
		await mongoose.connect(mongoURI);
		console.log(
			`Successfully connected to Database in ${colors.magenta(`${NODE_ENV}`)}`
				.yellow,
		);
	} catch (error) {
		console.error("Error connecting to Database!!!".red);
		console.error(error);
		process.exit(1);
	}
};

export default connectToDatabase;
