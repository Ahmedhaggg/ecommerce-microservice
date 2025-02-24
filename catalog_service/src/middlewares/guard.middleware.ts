import { Request, Response, NextFunction } from "express";
import {
	BadRequestException,
	ForbiddenException,
	UnauthorizedException,
} from "../utils/errorHandlers/exception";
import { verifyJwtToken } from "../utils/jwt/index";
import { AuthTokenData } from "../types/authTokenData.type";
import { UserRole } from "../enums/userRole";
exports.guard =
	(roles: UserRole[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let token: string | undefined = req.headers["authorization"];

			if (!token) throw new UnauthorizedException();

			let data = await verifyJwtToken<AuthTokenData>(token);

			if (!data.role) throw new BadRequestException();

			if (!roles.includes(data.role)) throw new ForbiddenException();

			req.user = data;
			next();
		} catch (err) {
			next(err);
		}
	};
