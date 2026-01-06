import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';

// @des	    GET the signed in user
// @route   GET /api/v1/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) throw new AppError('Please sign-in to access user data', 400);

	const { _id, name, email } = user;
	res.status(200).json({
		success: true,
		data: {
			id: _id,
			name,
			email,
		},
	});
});
