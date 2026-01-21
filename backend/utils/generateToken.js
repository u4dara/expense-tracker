import jwt from "jsonwebtoken";
import { env } from "../configs/env.js";

const generateToken = (userId) => {
	return jwt.sign(
		{
			userId: userId,
		},
		env.JWT_SECRET,
		{ expiresIn: env.JWT_EXPIRES_IN },
	);
};

export default generateToken;
