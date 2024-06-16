require('dotenv').config();

const axios = require('axios');

const { productService, transactionService } = require('../services');
const { buildProduct, buildList } = require('../helpers/builders');
const { catchAsync, appResponse, AppError } = require('../helpers/core');
const {
  filterTransactionsByType,
  calculateTotalFromTransactions,
  getTotalQuantity,
} = require('../helpers/utils/products');
const { plainConverter } = require('../helpers/core/plainConverter');

exports.createProduct = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { name } = req.body;
  const product = buildProduct({ name, userId });

  const isValidName = await productService.isValidName(name, userId);

  if (!isValidName)
    throw new AppError('Product name must be unique', 400, 'ALREADY_EXISTS');

  const productRecord = await productService.create(product);

  appResponse({
    res,
    code: 201,
    message: 'Product created successfully',
    body: { product: productRecord },
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  await productService.delete(id);

  appResponse({
    res,
    message: 'Product deleted successfully',
  });
});

exports.getProducts = catchAsync(async (req, res) => {
  const products = await productService.getAll();
  const response = buildList(products);

  appResponse({
    res,
    message: 'Products retrieved successfully',
    body: response,
  });
});

exports.getProduct = catchAsync(async (req, res) => {
  const query = req.query || {};

  const transactionsRecords = await transactionService.getAll(
    {
      productId: req.product.id,
    },
    query,
  );

  const transactions = plainConverter(transactionsRecords);

  const { sales, purchases } = filterTransactionsByType(transactions);

  const stockSales = getTotalQuantity(sales);
  const stockPurchases = getTotalQuantity(purchases);

  const totalSales = calculateTotalFromTransactions(sales);
  const totalPurchases = calculateTotalFromTransactions(purchases);

  let predictions = null;

  const yearHistory = await transactionService.getSalesHistoryByYear(
    new Date().getFullYear()-1,
    req.product.id,
  );

  const transactionMonths = await transactionService.getTransactionsMonths(
    req.product.id,
  );

  console.log('\n transactions months: ', transactionMonths, '\n');

  if (transactionMonths.length > 1) {
    const statsPerMonth =
      await transactionService.getSalesAndRemainStocksByMonth(req.product.id);
    console.log('statsPerMonth ->', statsPerMonth);
    const monthToNumber = monthName => {
      const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      return months.indexOf(monthName) + 1;
    };

    const sortedStats = statsPerMonth.sort((a, b) => {
      const yearComparison = a.year - b.year;
      if (yearComparison !== 0) return yearComparison;
      return monthToNumber(a.month) - monthToNumber(b.month);
    });

    const lastFourMonths = sortedStats.slice(-4);

    const quantities = lastFourMonths.map(e => parseInt(e.sales_quantity, 10));

    console.log('quantities ->', quantities);

    if (quantities.length > 3) {
      const response = await axios({
        method: 'POST',
        url: process.env.PREDICTION_API_URL + '/api/predict',
        data: { sales: quantities },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      predictions = response.data;

      console.log('predictions', predictions);
    }
  }

  appResponse({
    res,
    message: 'Product retrieved successfully',
    body: {
      product: req.product,
      analytics: {
        totalSales: stockSales,
        totalPurchases: stockPurchases,
        totalEarnings: totalSales,
        totalInvested: totalPurchases,
      },
      predictions,
      yearHistory,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const adaptedProduct = buildProduct(req.body);
  const product = await productService.update(id, adaptedProduct);

  appResponse({
    res,
    message: 'Product updated successfully',
    body: product,
  });
});
