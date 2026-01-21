import { config } from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";

config({ path: envFile });

export const env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	MONGODB_URI: process.env.MONGODB_URI,
	MONGODB_URI_TEST: process.env.MONGODB_URI_TEST,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
