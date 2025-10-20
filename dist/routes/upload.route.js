"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const upload_controller_1 = require("../controllers/upload.controller");
const router = (0, express_1.Router)();
router.get("/file", upload_controller_1.getAllFiles);
// upload  images/files
router.post("/file", upload_middleware_1.upload.array("files", 10), upload_controller_1.uploadMultipleFiles);
// ✅ Delete Images/file
router.delete("/:filename", upload_controller_1.deleteFiles);
exports.default = router;
