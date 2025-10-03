import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import uploadFile from "../controllers/upload.controller";

const router = Router();

router.post("/file", upload.array("files", 10), uploadFile);

export default router;
