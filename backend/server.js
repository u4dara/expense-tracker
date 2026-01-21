import colors from "colors";
import app from "./app.js";
import { env } from "./configs/env.js";
import connectToDatabase from "./database/mongodb.js";

const startServer = async () => {
	await connectToDatabase();
	app.listen(env.PORT || 5500, () => {
		console.log(`Server is running on port ${env.PORT}`.yellow);
	});
};

if (process.env.NODE_ENV !== "test") {
	startServer();
}
