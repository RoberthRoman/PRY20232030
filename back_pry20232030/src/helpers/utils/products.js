const { TRANSACTION_TYPE } = require('../constants');

const calculateTotalFromTransactions = transactions => {
  return transactions.reduce((total, transaction) => {
    return (
      total +
      parseInt(transaction.quantity, 10) * parseFloat(transaction.unitPrice)
    );
  }, 0);
};

const filterTransactionsByType = transactions => {
  const sales = [];
  const purchases = [];

  transactions.forEach(transaction => {
    if (transaction.type.id === TRANSACTION_TYPE.LOAD) {
      purchases.push(transaction);
    } else if (transaction.type.id === TRANSACTION_TYPE.WITHDRAW) {
      transaction.quantity = transaction.quantity * -1;
      sales.push(transaction);
    }
  });

  return { sales, purchases };
};

const getTotalQuantity = transactions => {
  return transactions.reduce((total, transaction) => {
    return total + parseInt(transaction.quantity, 10);
  }, 0);
};

module.exports = {
  calculateTotalFromTransactions,
  filterTransactionsByType,
  getTotalQuantity,
};
