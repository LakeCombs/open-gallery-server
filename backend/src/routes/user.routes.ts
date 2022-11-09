import { Router } from "express";
import {
	loginUser,
	registerUser,
	updateUser,
} from "../controller/user.controller";

const userRoute = Router();

userRoute.route("/signup").post(registerUser);
userRoute.route("/login").post(loginUser);
userRoute.route("/update/:id").put(updateUser);

export default userRoute;
