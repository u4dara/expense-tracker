import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { env } from "../configs/env.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization?.startsWith("Bearer")) {
		// Get token from header
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		throw new AppError("Not authorized, No token provided!!", 401);
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, env.JWT_SECRET);

		// Get user from the token
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			throw new AppError("Unauthorized request!!", 401);
		}

		req.user = user;
		next();
	} catch (error) {
		throw new AppError("Not authorized, Token failed!!", 401);
	}
});

export default protect;
