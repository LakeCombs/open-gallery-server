import { Post_Interface } from "./../types/post.types";
import { model, Schema } from "mongoose";

const postSchema = new Schema<Post_Interface>(
	{
		user_id: { type: Schema.Types.ObjectId, ref: "User" },
		image: {
			type: String,
			required: true,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		category: [{ type: String }],
		description: { type: String },
	},
	{ timestamps: true }
);

const postModel = model<Post_Interface>("Post", postSchema);

export default postModel;
