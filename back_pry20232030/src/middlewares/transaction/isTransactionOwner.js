const { catchAsync, AppError } = require('../../helpers/core');
const { transactionService } = require('../../services');

const isTransactionOwner = catchAsync(async (req, res, next) => {
  const { id: transactionId } = req.params;

  const transaction = await transactionService.getOne({
    id: transactionId,
    userId: req.user.id,
  });

  if (!transaction) throw new AppError('Transaction not found', 404);
  req.transaction = transaction;

  next();
});

module.exports = isTransactionOwner;
