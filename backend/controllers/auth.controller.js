import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import isEmail from "validator/lib/isEmail.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";

// @des	   SIGN-UP a new User
// @route   POST /api/v1/auth/sign-up
// @access  Public
export const signUp = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new AppError("Please provide name, email and password!", 400);
	}

	// Validate email format
	if (!isEmail(email)) {
		throw new AppError("Please provide a valid email", 400);
	}

	// Validate password length
	if (password.length < 6) {
		throw new AppError("Password must be at least 6 characters long", 400);
	}

	// Check if user already exists
	const isUserExists = await User.findOne({ email });
	if (isUserExists) {
		throw new AppError("Registered User already exists with this email", 400);
	}

	// Hash password
	const saltRounds = process.env.NODE_ENV === "test" ? 1 : 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create new user
	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (newUser) {
		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: {
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				token: generateToken(newUser._id),
			},
		});
	} else {
		throw new AppError("Failed to create user!!", 500);
	}
});

// @des	   SIGN-IN a User
// @route   POST /api/v1/auth/sign-in
// @access  Public
export const signIn = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new AppError("Please provide email and password", 400);
	}

	// Validate email format
	if (!isEmail(email)) {
		throw new AppError("Please provide a valid email", 400);
	}

	const user = await User.findOne({ email });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new AppError("Invalid email or password. Please check again!", 401);
	}

	res.status(200).json({
		success: true,
		message: "User signed in successfully",
		data: {
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		},
	});
});

// @des	   SIGN-OUT a User
// @route   POST /api/v1/auth/sign-out
// @access  Private
export const signOut = asyncHandler(async (req, res) => {
	res.status(200).json({
		success: true,
		message: "User signed out successfully",
	});
});
