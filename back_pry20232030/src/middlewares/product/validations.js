const { body, param } = require('express-validator');

const onCreate = [
  body('name')
    .exists()
    .withMessage('name is required')
    .notEmpty()
    .withMessage('name cannot be empty')
    .trim()
    .escape(),
];

const onUpdate = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be an integer'),

  body('name')
    .optional()
    .notEmpty()
    .withMessage('name cannot be empty')
    .trim()
    .escape(),
];

const onMovement = [
  body('quantity')
    .exists()
    .withMessage('quantity is required')
    .isInt({ min: 1 })
    .trim()
    .escape(),
  body('unitPrice')
    .exists()
    .withMessage('unitPrice is required')
    .isDecimal({ min: 1 })
    .trim()
    .escape(),
  param('id')
    .exists()
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be an integer'),
];

const onMovementUpdate = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be an integer'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('quantity must be an integer'),
  body('unitPrice')
    .optional()
    .isDecimal({ min: 1 })
    .withMessage('unitPrice must be a decimal'),
];

module.exports = {
  onCreate,
  onUpdate,
  onMovement,
  onMovementUpdate,
};
