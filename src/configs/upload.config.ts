const handleMultipleUploadService = (
  baseUrl: string,
  protocol: string,
  files: Express.Multer.File[]
) => {
  return {
    message: "Files uploaded successfully!",
    files: files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      // path: `${protocol}://${baseUrl}/uploads/${file.filename}`,
      path: `/uploads/${file.filename}`,
      size: file.size,
    })),
  };
};

export default handleMultipleUploadService;
