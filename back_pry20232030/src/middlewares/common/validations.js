const { param } = require('express-validator');
const { jwtHelper } = require('../../helpers/libs');
const { AppError } = require('../../helpers/core');

const isToken = token => {
  const isValid = jwtHelper.verify(token);
  if (!isValid) throw new AppError('Token not valid', 401, 'VALIDATION_ERROR');
  return true;
};

const commonValidations = {
  validateIdParam: [param('id', 'Give a valid id').exists().isInt({ min: 1 })],
};

module.exports = { commonValidations, isToken };
