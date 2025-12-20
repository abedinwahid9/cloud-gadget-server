import express from "express";
import {
  getAllWistListByUser,
  wishlistCreate,
  wishlistDelete,
} from "../controllers/wishlist.controller";

const router = express.Router();

router.get("/me", getAllWistListByUser);
router.post("/", wishlistCreate);
router.delete("/:id", wishlistDelete);

export default router;
