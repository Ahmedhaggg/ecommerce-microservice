import { UserRole } from "../enums/userRole";

export type AuthTokenData = {
	role: UserRole;
	id: string;
	[key: string]: any;
};
