import express from "express";
import { optSend, verifyOtp } from "../controllers/otp.controller";

const router = express.Router();

router.post("/send-otp", optSend);
router.post("/verify-otp", verifyOtp);

export default router;
