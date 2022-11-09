import { User_Interface } from "./user.types";
import { Category_Type } from "./categories_types";
import { Document, Types } from "mongoose";

export interface Post_Interface extends Document {
	user_id: User_Interface;
	image: string;
	likes: Types.ObjectId[];
	category: Category_Type[];
	description?: string;
}
