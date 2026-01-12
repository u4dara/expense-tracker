import AppError from "../utils/appError.js";

export const numericValidation = (value, label) => {
	if (Number.isNaN(Number(value))) {
		throw new AppError(`Invalid ${label} format. Please check again`, 400);
	}
};
