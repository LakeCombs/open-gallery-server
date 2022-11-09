import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import logger from "../utils/logger";

const upload_to_cloudinary = multer({
	storage: multer.diskStorage({}),
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		callback: FileFilterCallback
	): void => {
		if (
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg"
		) {
			callback(null, true);
		} else {
			logger.error("file type is not supported");
			callback(null, false);
			return;
		}
	},
});

export default upload_to_cloudinary;
