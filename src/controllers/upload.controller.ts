import { Request, Response } from "express";
import handleMultipleUploadService from "../configs/upload.config";

// multiple upload
const uploadMultipleFiles = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const data = handleMultipleUploadService(files);
  res.status(200).json(data);
};

export default uploadMultipleFiles;
