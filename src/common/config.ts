/**
 * @module dotenv
 */
import dotenv from 'dotenv';

/**
 * This is a method of dotenv package to generate path to .env files
 */

dotenv.config();

/**
 * @name PORT
 * @constant PORT Considered Port of server
 */
  export const {PORT} = process.env;
  export const {NODE_ENV} = process.env;
  export const {MONGO_CONNECTION_STRING} = process.env;
  export const {JWT_SECRET_KEY} = process.env;
  export const AUTH_MODE = process.env.AUTH_MODE === 'true';

