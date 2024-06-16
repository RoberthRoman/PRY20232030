const JWT = require('jsonwebtoken');

const { AppError } = require('../core');
require('dotenv').config();

module.exports = {
  encode: (object, options) =>
    JWT.sign(object, process.env.SECRET_TOKEN, options),
  decode: token => {
    const decoded = JWT.decode(token);
    if (!decoded) throw new AppError('Invalid token', 400);
    return decoded;
  },
  verify: token =>
    JWT.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
      if (decoded) return true;
      return false;
    }),
  isRefreshToken: token => {
    const content = this.decode(token);
    return content.context.type === 'refresh';
  },
  isAccessToken: token => {
    const content = this.decode(token);
    return content.context.type === 'access';
  },
};
