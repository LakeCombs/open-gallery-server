import { Request, Response } from "express";
import {
	CREATE_POST,
	DELETE_POST_BY_ID,
	GET_ALL_POST,
	GET_POST_BY_CATEGORY,
	GET_POST_BY_ID,
	GET_POST_BY_KEYWORD,
	LIKE_A_POST,
	UPDATE_POST,
} from "../service/post.service";

export async function createPost(req: Request, res: Response): Promise<void> {
	const authorid = res.locals.user._id;
	const service = await CREATE_POST(authorid, req.body);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function editPost(req: Request, res: Response): Promise<void> {
	const service = await UPDATE_POST({ id: req.params.id, update: req.body });
	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function getAllPost(req: Request, res: Response): Promise<void> {
	const service = await GET_ALL_POST();
	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function getPostById(req: Request, res: Response): Promise<void> {
	const service = await GET_POST_BY_ID(req.params.id);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function getPostByKeyword(
	req: Request,
	res: Response
): Promise<void> {
	const keyword = req.query.query;
	const service = await GET_POST_BY_KEYWORD(`${keyword}`);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function getPostByCategory(
	req: Request,
	res: Response
): Promise<void> {
	const service = await GET_POST_BY_CATEGORY(req.body.category);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function deletePost(req: Request, res: Response): Promise<void> {
	const service = await DELETE_POST_BY_ID(req.params.id, res.locals.user);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.error);
}

export async function likeAPost(req: Request, res: Response): Promise<void> {
	const postid = req.params.id;
	const userid = res.locals.user._id;
	const service = await LIKE_A_POST(postid, userid);

	service.status
		? res.status(201).json(service.data)
		: res.status(400).json(service.data);
}
