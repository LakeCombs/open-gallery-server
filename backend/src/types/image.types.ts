import { Document } from "mongoose";

export interface Image_Interface extends Document {
	image: string;
	cloudinary_id: string;
}
