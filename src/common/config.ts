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
 * @type {string}
 */

export const { PORT } = process.env;

/**
 * @name NODE_ENV
 * @constant NODE_ENV Considered mode
 * @type {string}
 */

export const { NODE_ENV } = process.env;

/**
 * @name MONGO_CONNECTION_STRING
 * @constant MONGO_CONNECTION_STRING Considered path to MongoDB
 * @type {string}
 */

export const { MONGO_CONNECTION_STRING } = process.env;

/**
 * @name JWT_SECRET_KEY
 * @constant JWT_SECRET_KEY Considered jwt token
 * @type {string}
 */

export const { JWT_SECRET_KEY } = process.env;

/**
 * @name AUTH_MODE
 * @constant AUTH_MODE Considered authentication mode
 * @type {string}
 */

export const { AUTH_MODE } = process.env;

/**
 * @name LOGGING_LEVEL
 * @constant LOGGING_LEVEL Considered logging level
 * @type {string}
 */

export const { LOGGING_LEVEL } = process.env;
