import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 5000,
	limit: 3,
	message: { error: "Too many requests, please try again later." },
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	handler: (req, res, next, options) => {
		res.status(options.statusCode).json({
			success: false,
			message: options.message,
		});
	},
});

export default limiter;
