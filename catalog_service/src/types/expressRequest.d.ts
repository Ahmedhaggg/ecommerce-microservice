// src/types/express.d.ts or src/types/custom.d.ts

import { UserRole } from "../enums/userRole"; // Adjust the path as needed

declare global {
	namespace Express {
		interface Request {
			user?: {
				role: UserRole;
				id: string;
				[key: string]: any;
				// Add other properties from your `AuthTokenData` type
			};
		}
	}
}
