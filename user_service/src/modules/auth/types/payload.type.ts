import { Role } from '@common/enums/roles.enum';

export type AccessTokenPayload = {
  id: string;
  role: Role;
  email: string;
};
export type RefreshTokenPayload = {
  id: string;
};
