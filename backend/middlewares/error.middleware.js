const errorHandler = (err, req, res, next) => {
	try {
		const error = { ...err };
		error.message = err.message;

		console.log(`${error.message}`.red);

		// console.error("ERROR MESSAGE:", err.message);
		// console.error("ERROR NAME:", err.name);
		// console.error("ERROR STACK:", err.stack);

		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	} catch (err) {
		next(err);
	}
};

export default errorHandler;
