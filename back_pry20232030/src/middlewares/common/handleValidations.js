const { validationResult } = require('express-validator');
const { AppError } = require('../../helpers/core');

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new AppError(
      'Validation errors',
      400,
      'VALIDATION_ERROR',
      errors.array(),
    );
  }

  return next();
};

const handleValidations = validationSchema => [validationSchema, handleErrors];

module.exports = { handleValidations };
