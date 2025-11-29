import express from "express";
import { optSend, verifyOtp } from "../controllers/otp.controller";
import { optCheck } from "../middlewares/otpcheck.middleware";

const router = express.Router();

router.post("/send-otp", optSend);
router.post("/verify-otp", optCheck, verifyOtp);

export default router;
