import express from "express";
import productRoute from "./productRoute";
const router = express.Router();

router.use("/product", productRoute);

export default router;
