import express from "express";
import { createBanner } from "../controllers/banner.controller";

const router = express.Router();

router.post("/:id", createBanner);

export default router;
