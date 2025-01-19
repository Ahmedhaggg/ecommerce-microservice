import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import {
	BadRequestException,
	InternalServerErrorException,
} from "../errorHandlers/exception";

export const createJwtToken = async (
	data: any,
	expire: string | number
): Promise<string> => {
	try {
		let token: string = await jwt.sign(data, JWT_SECRET, {
			expiresIn: expire,
		});
		return token;
	} catch (_) {
		throw new InternalServerErrorException();
	}
};
export const verifyJwtToken = async <T>(token: string): Promise<T> => {
	try {
		return (await jwt.verify(token, JWT_SECRET)) as T;
	} catch (error: any) {
		throw new BadRequestException();
	}
};
