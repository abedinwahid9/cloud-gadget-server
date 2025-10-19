import express from "express";
import {
  createSubCategory,
  deleteSubCategoryById,
} from "../controllers/subcategory.controller";

const router = express.Router();

router.post("/", createSubCategory);
router.delete("/:id", deleteSubCategoryById);

export default router;
