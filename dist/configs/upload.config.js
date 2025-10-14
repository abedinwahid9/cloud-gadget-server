"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMultipleUploadService = (files) => {
    return {
        message: "Files uploaded successfully!",
        files: files.map((file) => ({
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            size: file.size,
        })),
    };
};
exports.default = handleMultipleUploadService;
