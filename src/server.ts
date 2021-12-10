import { PORT } from './common/config';
import app from './app';

/**
 * This method is starting listen the PORT
 */

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
