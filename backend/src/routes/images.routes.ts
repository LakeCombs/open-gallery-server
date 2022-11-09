import { Router } from "express";
import {
	deleteImage,
	editImage,
	getAllImages,
	getImageById,
	uploadImage,
} from "../controller/image.controller";

const imageRoute = Router();

imageRoute.route("/").get(getAllImages);
imageRoute.route("/:id").get(getImageById);
imageRoute.route("/").post(uploadImage);
imageRoute.route("/:id").put(editImage);
imageRoute.route("/:id").delete(deleteImage);

export default imageRoute;
