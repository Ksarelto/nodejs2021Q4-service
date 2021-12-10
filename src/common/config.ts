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

  /**
 * @name NODE_ENV
 * @constant NODE_ENV Considered mode
 */

  export const {NODE_ENV} = process.env;

  /**
 * @name MONGO_CONNECTION_STRING
 * @constant MONGO_CONNECTION_STRING Considered path to MongoDB
 */

  export const {MONGO_CONNECTION_STRING} = process.env;

  /**
 * @name JWT_SECRET_KEY
 * @constant JWT_SECRET_KEY Considered jwt token
 */

  export const {JWT_SECRET_KEY} = process.env;

  /**
 * @name AUTH_MODE
 * @constant AUTH_MODE Considered authentication mode
 */

  export const AUTH_MODE = process.env.AUTH_MODE === 'true';

