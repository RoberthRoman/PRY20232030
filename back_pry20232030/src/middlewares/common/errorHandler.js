/* eslint-disable no-param-reassign */
require('dotenv').config();

const { AppError } = require('../../helpers/core');

const isDevelopment = env => env === 'development';
const isProduction = env => env === 'production';

const buildError = (err, env) => {
  const error = {
    success: false,
    message: err.message || 'Internal Server Error.',
    statusCode: err.statusCode || 500,
    errors: err.errors || [],
  };

  if (isDevelopment(env)) {
    error.stack = err.stack;
    console.log(err);
  }

  return error;
};

module.exports = (err, req, res, next) => {
  const env = process.env.NODE_ENV || 'development';
  const error = buildError(err, env);

  if (isProduction(env)) {
    // TODO Mail handler
  }

  if (err instanceof AppError) {
    err.errorCode = err.errorCode || 'UNDEFINED';
    err.path = req.url;
    err.errors = err.errors || [];
  }

  res.status(error.statusCode).json(error);
};
