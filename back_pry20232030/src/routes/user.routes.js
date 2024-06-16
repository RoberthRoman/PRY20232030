const express = require('express');
const {
  getUserProducts,
  getUser,
  getUserTransactions,
} = require('../controllers/user');
const {
  handleValidations,
  commonValidations,
  handleAuth,
} = require('../middlewares/common');
const { isProfileOwner } = require('../middlewares/user');
const router = express.Router();

router.get(
  '/:id/products',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProfileOwner,
  getUserProducts,
);
router.get(
  '/:id',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProfileOwner,
  getUser,
);
router.get(
  '/:id/transactions',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProfileOwner,
  getUserTransactions,
);

module.exports = router;
