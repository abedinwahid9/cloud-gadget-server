"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = exports.deleteFiles = exports.uploadMultipleFiles = void 0;
const upload_config_1 = __importDefault(require("../configs/upload.config"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// multiple upload
const uploadMultipleFiles = (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded", files });
    }
    const baseUrl = `${req.get("host")}`;
    const protocol = req.protocol;
    const data = (0, upload_config_1.default)(baseUrl, protocol, files);
    res.status(200).json(data);
};
exports.uploadMultipleFiles = uploadMultipleFiles;
// get files
const filePath = path_1.default.join(process.cwd(), "public", "uploads");
const getAllFiles = async (req, res) => {
    fs_1.default.readdir(filePath, (err, files) => {
        if (err)
            return res.status(500).json({ error: "Failed to read uploads" });
        const baseUrl = `${req.get("host")}`;
        const fileUrls = files.map((file, i) => ({
            id: i,
            name: file,
            thumbnail: `${req.protocol}://${baseUrl}/uploads/${file}`,
        }));
        res.json({ files: fileUrls });
    });
};
exports.getAllFiles = getAllFiles;
// delete file
const deleteFiles = async (req, res) => {
    const filePath = path_1.default.join(process.cwd(), "public", "uploads", req.params.filename);
    fs_1.default.unlink(filePath, (err) => {
        if (err)
            return res.status(404).json({ message: "File not found" });
        res.json({ message: "File deleted successfully" });
    });
};
exports.deleteFiles = deleteFiles;
