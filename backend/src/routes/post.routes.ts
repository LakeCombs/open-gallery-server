import { Router } from "express";
import {
	createPost,
	deletePost,
	getAllPost,
	getPostByCategory,
	getPostById,
	getPostByKeyword,
	likeAPost,
} from "../controller/post.controller";
import { isLoggedin } from "../middleware/authentication.middleware";

const postRoute = Router();

postRoute.route("/keyword").get(getPostByKeyword);
postRoute.route("/").get(getAllPost);
postRoute.route("/:id").get(getPostById);
postRoute.route("/category").get(getPostByCategory);
postRoute.route("/").post(isLoggedin, createPost);
postRoute.route("/:id").put(isLoggedin, likeAPost);
postRoute.route("/:id").delete(isLoggedin, deletePost);

export default postRoute;
