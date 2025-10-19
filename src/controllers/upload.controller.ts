import { Request, Response } from "express";
import handleMultipleUploadService from "../configs/upload.config";
import fs from "fs";
import path from "path";

// multiple upload
const uploadMultipleFiles = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded", files });
  }
  const baseUrl = `${req.get("host")}`;
  const protocol = req.protocol;
  const data = handleMultipleUploadService(baseUrl, protocol, files);
  res.status(200).json(data);
};

// get files
const filePath = path.join(process.cwd(), "public", "uploads");
const getAllFiles = async (req: Request, res: Response) => {
  fs.readdir(filePath, (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read uploads" });

    const baseUrl = `${req.get("host")}`;

    const fileUrls = files.map((file, i) => ({
      id: i,
      name: file,
      thumbnail: `${req.protocol}://${baseUrl}/uploads/${file}`,
    }));

    res.json({ files: fileUrls });
  });
};

// delete file
const deleteFiles = async (req: Request, res: Response) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    req.params.filename
  );
  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted successfully" });
  });
};

export { uploadMultipleFiles, deleteFiles, getAllFiles };
