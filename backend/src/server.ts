import dotenv from "dotenv";
import createServer from "./utils/app";
import connectDb from "./utils/connectDb";
import logger from "./utils/logger";

dotenv.config();
connectDb();
const app = createServer();

app.listen(process.env.PORT, (): void => {
	logger.info(`App is running on port ${process.env.PORT}`);
});
