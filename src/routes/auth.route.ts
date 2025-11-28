import express from "express";
import {
  checkMe,
  userCreate,
  userLogin,
  userLogout,
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/me", checkMe);
router.post("/signup", userCreate);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;
