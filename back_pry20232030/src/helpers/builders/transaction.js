const { TRANSACTION_TYPE } = require('../constants');

const buildTransaction = (movement, type) => {
  const quantity =
    type === TRANSACTION_TYPE.LOAD ? movement.quantity : movement.quantity * -1;

  return {
    quantity,
    typeId: type,
    productId: movement.productId,
    userId: movement.userId,
    unitPrice: movement.unitPrice,
  };
};

module.exports = { buildTransaction };
