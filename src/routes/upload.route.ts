import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";

import {
  deleteFiles,
  getAllFiles,
  uploadMultipleFiles,
} from "../controllers/upload.controller";

const router = Router();

router.get("/file", getAllFiles);

// upload  images/files
router.post("/file", upload.array("files", 10), uploadMultipleFiles);

// ✅ Delete Images/files
router.delete("/:filename", deleteFiles);

export default router;
