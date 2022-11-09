import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import v1 from "../apis/v1";

const createServer = () => {
	const app = express();
	app
		.use(express.json())
		.use(cors())
		.use(morgan("combined"))
		.use(helmet())
		.use("/api/v1", v1);

	return app;
};

export default createServer;
