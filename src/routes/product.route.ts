import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getCollectionProduct,
  getProductById,
  maxProductPrice,
  updateProductById,
  updateProductStatus,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/max-price", maxProductPrice);
router.get("/collections/:collection", getCollectionProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.patch("/:id", updateProductById);
router.patch("/status/:id", updateProductStatus);

export default router;
