import cloudinary from "../utils/cloudinary";
import Image from "../model/Image.model";
import logger from "../utils/logger";
import { Query_Interface } from "../types/query.types";
import { Image_Interface } from "../types/image.types";

export const UPLOAD_IMAGE = async (
	filepath: any[]
): Promise<Query_Interface> => {
	try {
		const uploader = async (path: any) => {
			return await cloudinary.uploader.upload(path, {
				folder: process.env.CLOUDINARY_FOLDER_NAME,
			});
		};

		const urls = [];
		for (const file of filepath) {
			const newPath = await uploader(file.path);
			urls.push({
				image: newPath?.secure_url,
				cloudinary_id: newPath?.public_id,
			});
		}

		let new_image = await Image.create(urls);
		logger.info(`an image have been uploaded`);
		return {
			status: true,
			data: new_image,
		};
	} catch (error: any) {
		logger.error(error);
		return {
			error: error,
			status: false,
		};
	}
};

export const DELETE_IMAGE = async (id: string): Promise<Query_Interface> => {
	try {
		let image: Image_Interface | null = await Image.findById(id);
		await cloudinary.uploader.destroy(image?.cloudinary_id as string);
		await image?.remove();
		logger.info(`an image have been deleted`);
		return {
			status: true,
			data: image,
		};
	} catch (error: any) {
		logger.error(
			`an error occoured while deleting image ${error.message || error} `
		);
		return {
			error: error.message || error,
			status: false,
		};
	}
};

export const GET_ALL_IMAGE = async (): Promise<Query_Interface> => {
	try {
		const images: Image_Interface[] = await Image.find();
		logger.info("You have fetch all the images");
		return {
			status: true,
			data: images,
		};
	} catch (error: any) {
		logger.error(
			` an error occoured while getting all image ${error?.message || error}`
		);
		return {
			error: error.message,
			status: false,
		};
	}
};

export const GET_IMAGE_BY_ID = async (id: string): Promise<Query_Interface> => {
	try {
		if (!id || id === "") {
			return {
				status: false,
				error: "Sorry! i can't find this image, no id given",
			};
		}
		const image = await Image.findById({ _id: id });
		logger.info("You have fetch an image");
		return {
			status: true,
			data: image,
		};
	} catch (error: any) {
		logger.error(error?.message);
		return {
			error: error.message,
			status: false,
		};
	}
};

export const EDIT_IMAGE = async (
	id: string,
	file: string
): Promise<Query_Interface> => {
	try {
		let get_image = await Image.findById({ _id: id });
		await cloudinary.uploader.destroy(get_image?.cloudinary_id as string);
		let result;
		if (file) {
			result = await cloudinary.uploader.upload(file, {
				folder: process.env.CLOUDINARY_FOLDER_NAME,
			});
		}
		const data = {
			image: result?.secure_url || result?.url,
			cloudinary_id: result?.public_id || get_image?.cloudinary_id,
		};
		get_image = await Image.findByIdAndUpdate(id, data, { new: true });

		logger.info("You have fetch an image");
		return {
			status: true,
			data: get_image,
		};
	} catch (error: any) {
		logger.error(
			` an error occoured while updating image object ${error?.message}`
		);
		return {
			error: error.message,
			status: false,
		};
	}
};
