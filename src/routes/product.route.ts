import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getCollectionProduct,
  getProductById,
  updateProductById,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:collections", getCollectionProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.patch("/:id", updateProductById);

export default router;
