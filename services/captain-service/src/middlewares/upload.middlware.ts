import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.config";
import multer from "multer";
import { Request } from "express";

export const getUploadMiddleware = (
  folder: string,
  fieldName: string,
  allowedFormats: string[] = ["jpg", "jpeg", "png", "pdf"]
) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: () => ({
      folder,
      allowed_formats: allowedFormats,
      transformation: [{ width: 1000, crop: "limit" }],
    }),
  });

  const upload = multer({
    storage,
    fileFilter: function (req: Request, file, cb) {
      const isValidType = allowedFormats.includes(file.mimetype.split("/")[1]);
      if (!isValidType) {
        return cb(
          new Error(
            `Invalid file type. Only ${allowedFormats.join(", ")} allowed.`
          )
        );
      }
      cb(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    },
  });

  return upload.single(fieldName);
};
