import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);

export default router;
