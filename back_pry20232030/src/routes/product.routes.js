const express = require('express');
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product');
const {
  handleAuth,
  handleValidations,
  commonValidations,
} = require('../middlewares/common');
const {
  isProductOwner,
  productsValidations,
} = require('../middlewares/product');
const {
  generateLoad,
  generateWithdraw,
} = require('../controllers/transaction');

const router = express.Router();

router.post(
  '/',
  handleAuth,
  handleValidations(productsValidations.onCreate),
  createProduct,
);
router.get('/:id', handleAuth, isProductOwner, getProduct);
router.put(
  '/:id',
  handleAuth,
  isProductOwner,
  handleValidations(productsValidations.onUpdate),
  updateProduct,
);
router.delete(
  '/:id',
  handleAuth,
  handleValidations(commonValidations.validateIdParam),
  isProductOwner,
  deleteProduct,
);
router.post(
  '/:id/load',
  handleAuth,
  handleValidations(productsValidations.onMovement),
  isProductOwner,
  generateLoad,
);
router.post(
  '/:id/withdraw',
  handleAuth,
  handleValidations(productsValidations.onMovement),
  isProductOwner,
  generateWithdraw,
);

module.exports = router;
