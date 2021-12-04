const statusCodes = {
  notFound: 404,
  invalidId: 400,
  internalError: 500,
  successCode: 200,
  successDelete: 204,
  successCreate: 201,
};

const headers = {
  'Content-Type': 'application/json',
};

module.exports = { statusCodes, headers };
