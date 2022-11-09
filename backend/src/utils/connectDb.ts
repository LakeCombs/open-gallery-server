import mongoose from "mongoose";
import logger from "./logger";

const connectDb = async (): Promise<void> => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI as string);
		logger.info(`connected to database as ${connect?.connection?.host}`);
	} catch (error: any) {
		logger.error(
			`Sorry an error occoured while connection to database ${
				error?.message || error
			}`
		);
	}
};

export default connectDb;
