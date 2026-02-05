import express from "express";
import { createZoneCharge } from "../controllers/charge.controller";

const router = express.Router();

router.post("/", createZoneCharge);

export default router;
