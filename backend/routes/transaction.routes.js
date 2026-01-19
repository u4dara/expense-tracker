import { Router } from "express";
import {
	addTransaction,
	getSoftDeletedTransactions,
	getTransactions,
	permanentDeleteTransaction,
	restoreSoftDeletedTransaction,
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
transactionRouter.route("/bin").get(protect, getSoftDeletedTransactions);
transactionRouter
	.route("/bin/:id")
	.delete(protect, permanentDeleteTransaction)
	.put(protect, restoreSoftDeletedTransaction);

export default transactionRouter;
