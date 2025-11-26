import express from "express";
import {
  createSubCategory,
  deleteSubCategoryById,
  getAllSubCategory,
  getSubCategoryByCategory,
} from "../controllers/subcategory.controller";

const router = express.Router();

router.get("/", getAllSubCategory);
router.get("/:category", getSubCategoryByCategory);
router.post("/", createSubCategory);
router.delete("/:id", deleteSubCategoryById);

export default router;
