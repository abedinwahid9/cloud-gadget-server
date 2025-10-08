import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);

export default router;
