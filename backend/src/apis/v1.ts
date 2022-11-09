import { Router, Response, Request } from "express";
import imageRoute from "../routes/images.routes";
import postRoute from "../routes/post.routes";
import userRoute from "../routes/user.routes";

const v1: Router = Router();

v1.get("/", (_req: Request, res: Response) => {
	res.status(200).json({
		api_version: "1.0.0",
		"health status": "api is live",
		message: `welcome! this the the open gallery server api`,
	});
});

v1.use("/user", userRoute);
v1.use("/post", postRoute);
v1.use("/image", imageRoute);

export default v1;
