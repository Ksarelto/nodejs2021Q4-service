import { EntBoard } from '../routes/boards/entities/board.entity';
import { EntColumn } from '../routes/columns/entities/column.entity';
import { EntTask } from '../routes/tasks/entities/task.entity';
import { EntUser } from '../routes/users/entities/user.entity';
import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_NAME,
  POSTGRES_PASSWORD,
  POSTRGES_HOST,
  POSTRGES_PORT,
} from '../common/config';
import { databaseType } from './constants';

const connectionData: ConnectionOptions = {
  type: databaseType,
  host: POSTRGES_HOST,
  port: POSTRGES_PORT ? +POSTRGES_PORT : 5432,
  username: POSTGRES_NAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [EntBoard, EntUser, EntTask, EntColumn],
  synchronize: false,
  migrations: ['./dist/db/migrations/*.js'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'db/migrations',
  },
  logging: false,
  dropSchema: false,
};

export default connectionData;
