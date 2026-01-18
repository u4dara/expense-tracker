import { Router } from "express";
import {
	addTransaction,
	getTransactions,
	softDeleteTransaction,
	updateTransaction,
} from "../controllers/transaction.controller.js";
import protect from "../middlewares/auth.middleware.js";

const transactionRouter = Router();

transactionRouter
	.route("/")
	.get(protect, getTransactions)
	.post(protect, addTransaction);
transactionRouter
	.route("/:id")
	.put(protect, updateTransaction)
	.delete(protect, softDeleteTransaction);

export default transactionRouter;
