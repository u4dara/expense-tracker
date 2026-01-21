import mongoose from "mongoose";

beforeAll(async () => {
	if (!process.env.MONGODB_URI_TEST) {
		throw new Error("MONGODB_URI_TEST is not defined");
	}

	await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
   await mongoose.connection.db.dropDatabase();
	await mongoose.connection.close();
});
