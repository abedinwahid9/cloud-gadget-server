import express from "express";
import { allUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/", allUser);

export default router;
