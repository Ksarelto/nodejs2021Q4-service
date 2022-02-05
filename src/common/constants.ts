export const headers = {
  'Content-Type': 'application/json',
};

export const passwordStrength = 7;

export const LogLevelsObject = {
  crit: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
};

export const LogColorsObject = {
  crit: 'white redBG',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
};

export const defaultAdmin = {
  name: 'Admin',
  login: 'admin',
  password: 'admin',
};

export const databaseType = 'postgres';
export const downloadFileDestination = './src/routes/files/db/';
