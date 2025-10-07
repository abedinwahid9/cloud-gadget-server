import { Request, Response } from "express";
import handleMultipleUploadService from "../configs/upload.config";
import path from "path";
import fs from "fs";

// multiple upload
const uploadMultipleFiles = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const data = handleMultipleUploadService(files);
  res.status(200).json(data);
};

const deleteFiles = async (req: Request, res: Response) => {
  const filePath = path.join(process.cwd(), "uploads", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted successfully" });
  });
};

export { uploadMultipleFiles, deleteFiles };
