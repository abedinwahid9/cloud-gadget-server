"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMultipleUploadService = (baseUrl, protocol, files) => {
    return {
        message: "Files uploaded successfully!",
        files: files.map((file) => ({
            originalName: file.originalname,
            filename: file.filename,
            path: `${protocol}://${baseUrl}/uploads/${file.filename}`,
            size: file.size,
        })),
    };
};
exports.default = handleMultipleUploadService;
