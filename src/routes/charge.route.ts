import express from "express";
import {
  createZoneCharge,
  getZoneCharge,
} from "../controllers/charge.controller";

const router = express.Router();

router.post("/", createZoneCharge);
router.get("/", getZoneCharge);

export default router;
