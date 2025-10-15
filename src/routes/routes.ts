import express from "express";
import productRoute from "./product.route";
import uploadRoute from "./upload.route";
import categoryRoute from "./category.route";
import slidersRoute from "./sliders.route";
const router = express.Router();

router.use("/product", productRoute);
router.use("/upload", uploadRoute);
router.use("/promotion/sliders", slidersRoute);
router.use("/category", categoryRoute);

export default router;
