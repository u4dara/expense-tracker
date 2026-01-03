import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';

// @des	   GET the signed in user
// @route   GET /api/v1/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user._id);
	res.status(200).json({
		success: true,
		data: {
			id: _id,
			name,
			email,
		},
	});
});
