const { AppError, catchAsync } = require('../../helpers/core');

const isProfileOwner = catchAsync(async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  if (userId !== req.user.id) throw new AppError('Unauthorized', 401);
  next();
});

module.exports = { isProfileOwner };
