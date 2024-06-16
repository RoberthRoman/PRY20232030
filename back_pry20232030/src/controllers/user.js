const { buildList } = require('../helpers/builders');
const { catchAsync, AppError, appResponse } = require('../helpers/core');
const {
  userService,
  productService,
  transactionService,
} = require('../services');

exports.getUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await userService
    .getOne({ id })
    .then(user => user.get({ plain: true }));

  if (!user) throw new AppError('Not found', 404, 'NOT_FOUND');

  delete user.password;

  appResponse({
    res,
    status: 200,
    body: user,
  });
});

exports.getUserProducts = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query || {};

  const products = await productService.getAll({ userId: id }, query);
  const productList = buildList(products);

  appResponse({
    res,
    status: 200,
    body: productList,
  });
});

exports.getUserTransactions = catchAsync(async (req, res) => {
  const { id } = req.params;
  const query = req.query || {};

  const transactions = await transactionService.getAll({ userId: id }, query);
  const transactionsList = buildList(transactions);

  appResponse({
    res,
    status: 200,
    body: transactionsList,
  });
});
