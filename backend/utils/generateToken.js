import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/env.js";

const generateToken = (userId) => {
	return jwt.sign(
		{
			userId: userId,
		},
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN },
	);
};

export default generateToken;
