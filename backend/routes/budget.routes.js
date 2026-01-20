import { Router } from "express";
import {
	addBudget,
	getBudgets,
	getSoftDeletedBudgets,
	permanentDeleteBudget,
	restoreSoftDeletedBudget,
	softDeleteBudget,
	updateBudget,
} from "../controllers/budget.controller.js";
import { getBudgetVsExpenseUsage } from "../controllers/budgetUsage.controller.js";
import protect from "../middlewares/auth.middleware.js";

const budgetRouter = Router();

budgetRouter.route("/").get(protect, getBudgets).post(protect, addBudget);
budgetRouter
	.route("/:id")
	.put(protect, updateBudget)
	.delete(protect, softDeleteBudget);
budgetRouter.get("/bin", protect, getSoftDeletedBudgets);
budgetRouter
	.route("/bin/:id")
	.put(protect, restoreSoftDeletedBudget)
	.delete(protect, permanentDeleteBudget);
budgetRouter.get("/usage", protect, getBudgetVsExpenseUsage);

export default budgetRouter;
