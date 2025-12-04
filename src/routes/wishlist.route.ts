import express from "express";
import {
  getAllWistListByUser,
  wishlistCreate,
} from "../controllers/wishlist.controller";

const router = express.Router();

router.get("/:userId", getAllWistListByUser);
router.post("/", wishlistCreate);

export default router;
