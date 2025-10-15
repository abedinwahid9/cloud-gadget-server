import express from "express";
import { slidersCreate } from "../controllers/sliders.controller";

const router = express.Router();

router.post("/", slidersCreate);

export default router;
