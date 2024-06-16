const express = require('express');
const { login, refreshAccessToken, logout } = require('../controllers/auth');
const { handleValidations } = require('../middlewares/common');
const { validateLogin, validateRefreshToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', handleValidations(validateLogin), login);
router.post(
  '/refresh-token',
  handleValidations(validateRefreshToken),
  refreshAccessToken,
);
router.post('/logout', handleValidations(validateRefreshToken), logout);

module.exports = router;
