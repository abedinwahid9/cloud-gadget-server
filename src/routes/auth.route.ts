import express from "express";
import {
  checkMe,
  userCreate,
  userLogin,
  userLogout,
} from "../controllers/auth.controller";
import { optCheck } from "../middlewares/otpcheck.middleware";

const router = express.Router();

router.get("/me", checkMe);
router.post("/signup", optCheck, userCreate);
router.post("/login", userLogin);
router.get("/logout", userLogout);

export default router;
