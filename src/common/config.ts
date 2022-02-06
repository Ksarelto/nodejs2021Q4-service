import dotenv from 'dotenv';

dotenv.config();

export const { PORT } = process.env;

export const { NODE_ENV } = process.env;

export const { MONGO_CONNECTION_STRING } = process.env;

export const { JWT_SECRET_KEY } = process.env;

export const { AUTH_MODE } = process.env;

export const { LOGGING_LEVEL } = process.env;

export const { POSTRGES_HOST } = process.env;

export const { POSTRGES_PORT } = process.env;

export const { POSTGRES_NAME } = process.env;

export const { POSTGRES_PASSWORD } = process.env;

export const { POSTGRES_DB } = process.env;

export const { USE_FASTIFY } = process.env;
