import express from "express";
import { createSubCategory } from "../controllers/subcategory.controller";

const router = express.Router();

router.post("/", createSubCategory);

export default router;
