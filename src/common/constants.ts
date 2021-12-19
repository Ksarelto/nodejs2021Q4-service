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
};

/**
 * The list of response headers
 * @constant headers
 * @type {object}
 */
export const headers = {
  'Content-Type': 'application/json',
};

