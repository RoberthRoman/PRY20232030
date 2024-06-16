const { buildTransaction } = require('../helpers/builders');
const { TRANSACTION_TYPE } = require('../helpers/constants');
const { catchAsync, appResponse, AppError } = require('../helpers/core');
const { transactionService, productService } = require('../services');

exports.generateLoad = catchAsync(async (req, res) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;
  const transaction = buildTransaction(
    { ...req.body, userId, productId },
    TRANSACTION_TYPE.LOAD,
  );

  const generatedTransaction = await transactionService.create(transaction);

  appResponse({
    res,
    status: 201,
    body: generatedTransaction,
  });
});

exports.generateWithdraw = catchAsync(async (req, res) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  if (req.body.quantity > req.product.stock)
    throw new AppError('Insufficient stock', 400, 'INSUFFICIENT_STOCK');

  const transaction = buildTransaction(
    { ...req.body, userId, productId },
    TRANSACTION_TYPE.WITHDRAW,
  );

  const generatedTransaction = await transactionService.create(transaction);

  appResponse({
    res,
    status: 201,
    body: generatedTransaction,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const transaction = await transactionService.getById(id);

  if (!transaction)
    throw new AppError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');

  const transactionUpdated = await transactionService.update(id, req.body);

  appResponse({
    res,
    status: 200,
    body: transactionUpdated,
  });
});

exports.destroy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const transaction = await transactionService.getById(id);

  if (!transaction)
    throw new AppError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');

  await transactionService.destroy(id);
  await productService.updateStock(transaction.productId);

  appResponse({
    res,
    status: 204,
  });
});
