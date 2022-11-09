import { Request, Response, NextFunction } from "express";
import User from "../model/user.model";
import { verifyJWT } from "../utils/jwt";
import logger from "../utils/logger";

export const isLoggedin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let user_token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			user_token = req.headers.authorization.split(" ")[1];
			let userid = verifyJWT(user_token);

			if (userid.expired) {
				return res.status(404).json({
					status: false,
					message: "Your session has expired please login and try again ",
				});
			}

			const user = await User.findById(userid.decoded.payload).select(
				"-password"
			);

			res.locals.user = user;
			res.locals.user_id = userid;
			return next();
		} catch (error: any) {
			logger.error(error.message);
			return res.status(401).json({
				status: false,
				message:
					"You are not authorized to preform this operation, please login and try again",
			});
		}
	}

	if (!user_token) {
		return res.status(400).json({
			status: false,
			message:
				"You are not authorized to perfom this operation please login and try again, no user_token",
		});
	}
};
