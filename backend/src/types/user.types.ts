import { Document, Types } from "mongoose";

export interface User_Interface extends Document {
	_doc: any;
	comparePassword(password: string): Boolean | PromiseLike<Boolean>;
	first_name?: string;
	last_name?: string;
	email: string | any;
	username?: string;
	phone?: string;
	facebook_url?: string;
	instagram_url?: string;
	twitter_url?: string;
	gallery: Types.ObjectId[];
	password?: string | any;
	quote?: string;
	profile_image?: string;
	isAdmin: boolean;
}
