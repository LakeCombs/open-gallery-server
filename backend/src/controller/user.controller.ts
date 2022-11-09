import { Request, Response } from "express";
import { CREATE_USER, LOGIN_USER, UPDATE_USER } from "../service/user.service";

export async function registerUser(req: Request, res: Response): Promise<void> {
	const service = await CREATE_USER(req.body);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function loginUser(req: Request, res: Response): Promise<void> {
	const service = await LOGIN_USER({
		input: req.body.email || req.body.phone || req.body.username,
		password: req.body.password,
	});

	service.status
		? res.status(200).json(service.data)
		: res.status(400).json(service.error);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
	const service = await UPDATE_USER(req.params.id, req.body);
	service.status
		? res.status(201).json(service.data)
		: res.status(404).json(service.error);
}
