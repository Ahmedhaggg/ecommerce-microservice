import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  hashSolt: parseInt(process.env.HASH_SOLT) || 10,
  redisUrl: process.env.REDIS_URL,
}));
