const handleMultipleUploadService = (files: Express.Multer.File[]) => {
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

export default handleMultipleUploadService;
