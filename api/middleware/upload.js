import multer from "multer";

export const SingleUpload = multer().single("file");