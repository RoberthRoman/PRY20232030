const rateLimit = require('express-rate-limit');

const rateLimiter = (maxRequests, perMinutes) => {
  return rateLimit({
    windowsMs: perMinutes * 60 * 1000,
    max: maxRequests,
    legacyHeaders: false,
  });
};

module.exports = { rateLimiter };
