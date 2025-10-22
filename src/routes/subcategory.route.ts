import express from "express";
import {
  createSubCategory,
  deleteSubCategoryById,
  getAllSubCategory,
} from "../controllers/subcategory.controller";

const router = express.Router();

router.get("/", getAllSubCategory);
router.post("/", createSubCategory);
router.delete("/:id", deleteSubCategoryById);

export default router;
