const express = require('express');

const { handleValidations, handleAuth } = require('../middlewares/common');
const { update, destroy } = require('../controllers/transaction');
const { transactionsValidations } = require('../middlewares/transaction');
const isTransactionOwner = require('../middlewares/transaction/isTransactionOwner');
const router = express.Router();

router.put(
  '/:id',
  handleAuth,
  isTransactionOwner,
  handleValidations(transactionsValidations.onUpdate),
  update,
);
router.delete(
  '/:id',
  handleAuth,
  isTransactionOwner,
  handleValidations(transactionsValidations.onDelete),
  destroy,
);

module.exports = router;
