import { model, Schema } from "mongoose";
import { Image_Interface } from "../types/image.types";

const imageSchema = new Schema<Image_Interface>(
	{
		image: {
			type: String,
			required: true,
		},
		cloudinary_id: {
			type: String,
		},
	},
	{ timestamps: true }
);

const imageModel = model<Image_Interface>("Image", imageSchema);

export default imageModel;
