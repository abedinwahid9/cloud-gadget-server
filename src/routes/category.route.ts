import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  updataCategoryById,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.delete("/:id", deleteCategoryById);
router.patch("/:id", updataCategoryById);

export default router;
