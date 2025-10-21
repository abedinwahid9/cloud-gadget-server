import express from "express";
import {
  createBanner,
  deleteBannerById,
  getBannerByName,
} from "../controllers/banner.controller";

const router = express.Router();

router.post("/:id", createBanner);
router.get("/:id", getBannerByName);
router.delete("/:id", deleteBannerById);

export default router;
