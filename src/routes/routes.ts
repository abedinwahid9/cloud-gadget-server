import express from "express";
import productRoute from "./product.route";
import uploadRoute from "./upload.route";
import categoryRoute from "./category.route";
import slidersRoute from "./sliders.route";
import subCategoryRouter from "./subcategory.route";
import bannerRouter from "./banner.route";
import signupRouter from "./auth.route";
import otpRouter from "./otp.route";
import userRouter from "./user.route";
import wishlistRouter from "./wishlist.route";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRoute);
router.use("/upload", uploadRoute);
router.use("/promotion/sliders", slidersRoute);
router.use("/category", categoryRoute);
router.use("/sub-category", subCategoryRouter);
router.use("/banner", bannerRouter);
router.use("/auth", signupRouter);
router.use("/otp", otpRouter);
router.use("/wishlist", wishlistRouter);

export default router;
