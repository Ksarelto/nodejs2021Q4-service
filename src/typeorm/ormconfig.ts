/**
 * @module ormconfig
 */
import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_NAME,
  POSTGRES_PASSWORD,
  POSTRGES_HOST,
  POSTRGES_PORT,
} from '../common/config';

/**
 * @constant connections - Consist of options for typeorm connection to db
 * @type {ConnectionOptions}
 */

const connections: ConnectionOptions = {
  type: 'postgres',
  host: POSTRGES_HOST,
  port: POSTRGES_PORT ? +POSTRGES_PORT : 5432,
  username: POSTGRES_NAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['./src/typeorm/entities/*.ts'],
  synchronize: false,
  migrations: ['./db/migrations/*.ts'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'db/migrations',
  },
  logging: false,
  dropSchema: false,
};

export default connections;
