/**
 * @module constants
 */

/**
 * The list of status codes of responses
 * @constant Status_Codes
 * @enum
 */
export const StatusCodes = {
  notFound: 404,
  invalidId: 400,
  internalError: 500,
  successCode: 200,
  successDelete: 204,
  successCreate: 201,
  invalidPassword: 403,
  invalidToken: 401,
};

/**
 * The list of response headers
 * @constant headers
 * @type {object}
 */
export const headers = {
  'Content-Type': 'application/json',
};

/**
 * The list of log levels
 * @constant log_levels
 * @type {object}
 */

export const LogLevelsObject = {
  crit: 0,
  error: 1,
  warn: 2,
  http: 3,
};

/**
 * The list of colors for logs text
 * @constant log_colors
 * @type {object}
 */

export const LogColorsObject = {
  crit: 'white redBG',
  error: 'red',
  warn: 'yellow',
  http: 'magenta',
};

export const defaultAdmin = {
  name: 'Admin',
  login: 'admin',
  password: 'admin',
};
