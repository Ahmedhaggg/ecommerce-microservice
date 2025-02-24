import { Request, Response, NextFunction } from "express";
import { HttpException } from "./exception";
export const errorHandlerMiddleware = (
	err: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(err.status || 500).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
};
