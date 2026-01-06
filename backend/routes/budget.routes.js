import { Router } from "express";
import { addBudget, getBudgets } from "../controllers/budget.controller.js";
import protect from "../middlewares/auth.middleware.js";

const budgetRouter = Router();

budgetRouter.route("/").get(protect, getBudgets).post(protect, addBudget);

export default budgetRouter;
