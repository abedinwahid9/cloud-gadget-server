import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.delete("/:id", deleteCategoryById);

export default router;
