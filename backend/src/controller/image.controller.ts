import { Request, Response } from "express";
import {
	DELETE_IMAGE,
	EDIT_IMAGE,
	GET_ALL_IMAGE,
	GET_IMAGE_BY_ID,
	UPLOAD_IMAGE,
} from "../service/image.service";

export async function uploadImage(req: Request, res: Response): Promise<void> {
	const filepath: any = req.files;
	const service = await UPLOAD_IMAGE(filepath);

	service.status
		? res.status(200).json(service.data)
		: res.status(404).json(service.error);
}

export async function getImageById(req: Request, res: Response): Promise<void> {
	const service = await GET_IMAGE_BY_ID(req.params.id);

	service.status
		? res.status(200).json(service.data)
		: res.status(404).json(service.error);
}

export async function deleteImage(req: Request, res: Response): Promise<void> {
	const service = await DELETE_IMAGE(req.params.id);
	service.status
		? res.status(200).json(service.data)
		: res.status(404).json(service.error);
}

export async function getAllImages(req: Request, res: Response): Promise<void> {
	const service = await GET_ALL_IMAGE();
	service.status
		? res.status(200).json(service.data)
		: res.status(404).json(service.error);
}

export async function editImage(req: Request, res: Response): Promise<void> {
	const file = req.file?.path;
	const service = await EDIT_IMAGE(req.params.id, file as string);

	service.status
		? res.status(200).json(service.data)
		: res.status(404).json(service.error);
}
