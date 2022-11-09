import { Request, Response, NextFunction } from "express";

export const not_found = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const error: Error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

export const error_handler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const status_code = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(status_code);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};
