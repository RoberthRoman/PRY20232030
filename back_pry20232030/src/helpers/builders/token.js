const { jwtHelper } = require('../libs');

require('dotenv').config();

const buildAccessToken = async tokenData => {
  const { id, email } = tokenData;
  const payload = {
    sub: id,
    context: {
      email: email,
      type: 'access',
    },
  };
  const options = {
    expiresIn: '30m',
  };
  return jwtHelper.encode(payload, options);
};

const buildRefreshToken = async tokenData => {
  const { id, email } = tokenData;
  const payload = {
    sub: id,
    context: {
      email: email,
      type: 'refresh',
    },
  };

  const options = {
    expiresIn: '1d',
  };

  return jwtHelper.encode(payload, options);
};

module.exports = {
  buildAccessToken,
  buildRefreshToken,
};
