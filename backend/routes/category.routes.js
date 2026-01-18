import { Router } from "express";
import {
	addCategory,
	archiveCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from "../controllers/category.controller.js";
import protect from "../middlewares/auth.middleware.js";

const transactionCategoryRouter = Router();

transactionCategoryRouter
	.route("/")
	.get(protect, getAllCategories)
	.post(protect, addCategory);
transactionCategoryRouter
	.route("/:id")
	.put(protect, updateCategory)
	.delete(protect, deleteCategory);
transactionCategoryRouter.put("/archive/:id", protect, archiveCategory);

export default transactionCategoryRouter;
