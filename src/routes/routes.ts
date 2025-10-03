import express from "express";
import productRoute from "./product.route";
import uploadRoute from "./upload.route";
const router = express.Router();

router.use("/product", productRoute);
router.use("/upload", uploadRoute);

export default router;
