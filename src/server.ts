import { createConnection } from 'typeorm';
import { PORT } from './common/config';
import app from './app';
import 'reflect-metadata';
import { uncaughtExeptionsHandler } from './handlers/other.handlers';
import connections from './typeorm/ormconfig';
import { createAdmin } from './auth/auth.prestart';

/**
 * Function to create connection with db and start the port
 * @async
 * @return - undefined
 */

const setConnection = async () => {
  try {
    await createConnection(connections);
    await createAdmin();
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    uncaughtExeptionsHandler(err as Error);
  }
};

setConnection();
