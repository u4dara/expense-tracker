const errorHandler = (err, req, res, next) => {
	try {
		const error = { ...err };
		error.message = err.message;

		console.log(`${error.message}`.red);

		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	} catch (err) {
		next(err);
	}
};

export default errorHandler;
