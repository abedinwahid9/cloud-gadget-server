import express from "express";
import { userGetRoleBased } from "../controllers/user.controller";

const router = express.Router();

router.get("/:role", userGetRoleBased);

export default router;
