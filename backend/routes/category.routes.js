import { Router } from "express";
import {
	addCategory,
	archiveCategory,
	deleteCategory,
	getAllCategories,
	unArchiveCategory,
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
transactionCategoryRouter.put("/unarchive/:id", protect, unArchiveCategory);

export default transactionCategoryRouter;
