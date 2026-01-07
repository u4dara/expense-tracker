import { Router } from "express";
import {
	addBudget,
	deleteBudget,
	getBudgets,
	updateBudget,
} from "../controllers/budget.controller.js";
import protect from "../middlewares/auth.middleware.js";

const budgetRouter = Router();

budgetRouter.route("/").get(protect, getBudgets).post(protect, addBudget);
budgetRouter
	.route("/:id")
	.put(protect, updateBudget)
	.delete(protect, deleteBudget);

export default budgetRouter;
