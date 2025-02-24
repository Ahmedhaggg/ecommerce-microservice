import { Role } from '../common/enums/roles.enum';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: Role;
    };
  }
}
