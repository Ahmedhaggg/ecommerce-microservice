import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  url: process.env.DB_URL,
}));
