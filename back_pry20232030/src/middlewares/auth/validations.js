const { body, query } = require('express-validator');
const { isToken } = require('../common/validations');

exports.validateLogin = [
  body('email').exists().notEmpty().isEmail().trim().escape(),
  body('password').exists().notEmpty().trim().escape(),
];

exports.validateRefreshToken = [
  body('refreshToken')
    .exists()
    .notEmpty()
    .custom(value => isToken(value))
    .trim()
    .escape(),
];

exports.validateForgotPassword = [
  body('email').exists().notEmpty().isEmail().trim().escape(),
];

exports.validateResetPassword = [
  body('password').exists().notEmpty().trim().escape(),
  query('token').exists().notEmpty().trim().escape(),
];
