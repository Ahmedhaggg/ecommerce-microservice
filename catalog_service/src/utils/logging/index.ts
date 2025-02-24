import morgan from "morgan";
import { winstonLogger } from "./winston";
export const loggingMiddleware = morgan(
	":method :url :status :res[content-length] - :response-time ms"
);

export const logger = winstonLogger;
