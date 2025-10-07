import express from "express";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);

export default router;
