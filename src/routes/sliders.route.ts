import express from "express";
import { slidersCreate, slidersGet } from "../controllers/sliders.controller";

const router = express.Router();

router.get("/", slidersGet);
router.post("/", slidersCreate);
// router.patch("/", slidersUpdate);

export default router;
