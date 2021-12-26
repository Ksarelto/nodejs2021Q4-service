import { PORT } from './common/config';
import app from './app';

/**
 * Koa "listen" method is starting listen the PORT
 * @remarks Method of Koa object(koa API)
 * @param {string} PORT the name of listened port
 * @param {callback} - callback that is called after port is listened
 */

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
