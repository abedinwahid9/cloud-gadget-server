import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";

import {
  deleteFiles,
  uploadMultipleFiles,
} from "../controllers/upload.controller";

const router = Router();

// upload  images/files
router.post("/file", upload.array("files", 10), uploadMultipleFiles);

// ✅ Delete Images/files
router.delete("/:filename", deleteFiles);

export default router;
