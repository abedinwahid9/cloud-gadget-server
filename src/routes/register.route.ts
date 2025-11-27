import express from "express";
import { userCreate } from "../controllers/register.controller";

const router = express.Router();

router.post("/signup", userCreate);

export default router;
