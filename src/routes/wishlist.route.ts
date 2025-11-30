import express from "express";
import { wishlistCreate } from "../controllers/wishlist.controller";

const router = express.Router();

router.post("/", wishlistCreate);

export default router;
