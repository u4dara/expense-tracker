import { config } from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";

config({ path: envFile });

export const {
	NODE_ENV,
	PORT,
	MONGODB_URI,
	MONGODB_URI_TEST,
	JWT_SECRET,
	JWT_EXPIRES_IN,
} = process.env;
