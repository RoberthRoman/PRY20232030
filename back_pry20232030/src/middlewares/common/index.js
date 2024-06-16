const { handleValidations } = require('./handleValidations');
const { commonValidations, isToken } = require('./validations');
const { handleAuth } = require('./handleAuth');
const errorHandler = require('./errorHandler');

module.exports = {
  handleValidations,
  commonValidations,
  errorHandler,
  handleAuth,
};
