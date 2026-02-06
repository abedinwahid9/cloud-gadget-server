import express from "express";
import {
  createZoneCharge,
  deleteZoneCharge,
  getZoneCharge,
  updateZoneCharge,
} from "../controllers/charge.controller";

const router = express.Router();

router.post("/", createZoneCharge);
router.get("/", getZoneCharge);
router.delete("/:id", deleteZoneCharge);
router.patch("/:id", updateZoneCharge);

export default router;
