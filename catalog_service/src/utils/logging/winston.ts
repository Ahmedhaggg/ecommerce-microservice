import { createLogger, format, transports } from "winston";

const { combine, errors, timestamp, json } = format;

export const winstonLogger = createLogger({
	format: combine(errors({ stack: true }), timestamp(), json()),
	defaultMeta: {
		service: "catalog_service",
	},
	transports: [
		new transports.File({ filename: "logs/logs.txt" }),
		new transports.Console(),
	],
});
