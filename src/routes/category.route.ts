import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  mergeCategories,
  updataCategoryById,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/merge", mergeCategories);
router.delete("/:id", deleteCategoryById);
router.patch("/:id", updataCategoryById);

export default router;
