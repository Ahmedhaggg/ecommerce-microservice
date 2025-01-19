import createError from "http-errors";
import { HTTPStatusCode } from "./httpStatusCode";

export class HttpException {
	constructor(status: HTTPStatusCode, message: string) {
		throw createError(status, message);
	}
}

export class BadRequestException extends HttpException {
	constructor(message = "Bad Request") {
		super(HTTPStatusCode.BadRequest, message);
	}
}

export class UnauthorizedException extends HttpException {
	constructor(message = "Unauthorized") {
		super(HTTPStatusCode.Unauthorized, message);
	}
}

export class ForbiddenException extends HttpException {
	constructor(message = "Forbidden") {
		super(HTTPStatusCode.Forbidden, message);
	}
}

export class NotFoundException extends HttpException {
	constructor(message = "Not Found") {
		super(HTTPStatusCode.NotFound, message);
	}
}

export class InternalServerErrorException extends HttpException {
	constructor(message = "Internal Server Error") {
		super(HTTPStatusCode.InternalServerError, message);
	}
}
