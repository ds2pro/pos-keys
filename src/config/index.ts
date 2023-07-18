import { config } from 'dotenv';
import validateEnv from '@utils/validateEnv';

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : undefined,
});
validateEnv();
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, DB_PASS, DB_USER, DB_NAME, DB_PORT, DB_HOST } = process.env;
