import express from "express";
import { userCreate, userLogin } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", userCreate);
router.post("/login", userLogin);

export default router;
