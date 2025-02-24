import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'default_secret',
  accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '3600s',
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'default_secret',
  refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
}));
