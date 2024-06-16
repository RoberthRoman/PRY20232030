const { catchAsync, AppError } = require('../../helpers/core');
const { productService } = require('../../services');

const isProductOwner = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;

  const product = await productService.getOne({
    id: productId,
    userId: req.user.id,
  });

  if (!product) throw new AppError('Product not found', 404);
  req.product = product;

  next();
});

module.exports = isProductOwner;
