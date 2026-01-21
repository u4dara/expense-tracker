import colors from "colors";
import mongoose from "mongoose";
import { env } from "../configs/env.js";

if (!env.MONGODB_URI && !env.MONGODB_URI_TEST) {
	throw new Error("MongoDB URI is missing!!");
}

const connectToDatabase = async () => {
	const mongoURI =
		process.env.NODE_ENV === "test" ? env.MONGODB_URI_TEST : env.MONGODB_URI;
	try {
		await mongoose.connect(mongoURI);
		console.log(
			`Successfully connected to Database in ${colors.magenta(`${env.NODE_ENV}`)}`
				.yellow,
		);
	} catch (error) {
		console.error("Error connecting to Database!!!".red);
		console.error(error);
		process.exit(1);
	}
};

export default connectToDatabase;
