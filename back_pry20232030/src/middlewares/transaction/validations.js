const { body, param } = require('express-validator');

const onCreate = [
  body('productId')
    .exists()
    .withMessage('productId is required')
    .isInt({ min: 1 })
    .withMessage('productId must be greater than 0'),
  body('quantity')
    .exists()
    .withMessage('quantity is required')
    .isInt({ min: 1 })
    .withMessage('quantity must be greater than 0'),
  body('typeId')
    .exists()
    .withMessage('typeId is required')
    .isInt({ min: 1 })
    .withMessage('typeId must be an integer'),
  body('unitPrice')
    .exists()
    .withMessage('unitPrice is required')
    .isDecimal({ min: 1 }),
  body('userId').exists().withMessage('userId is required').isInt({ min: 1 }),
];

const onUpdate = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be greater than 0'),
  body('productId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('productId must be greater than 0'),
  body('quantity')
    .optional()
    .isInt()
    .withMessage('quantity must be an integer'),
  body('unitPrice')
    .optional()
    .isDecimal({ min: 1 })
    .withMessage('unitPrice must be a decimal'),
  body('typeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('typeId must be an integer'),
];

const onDelete = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be an integer'),
];

module.exports = {
  onCreate,
  onUpdate,
  onDelete,
};
