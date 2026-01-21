import dotenv from "dotenv";
import mongoose from "mongoose";
import { MONGODB_URI_TEST } from "../configs/env";

beforeAll(async () => {
	if (!MONGODB_URI_TEST) {
		throw new Error("MONGO_URI_TEST is not defined");
	}
	await mongoose.connect(MONGODB_URI_TEST);
});

afterEach(async () => {
	await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
	await mongoose.connection.close();
});
