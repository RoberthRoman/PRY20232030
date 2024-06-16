const {
  buildUser,
  buildAccessToken,
  buildRefreshToken,
} = require('../helpers/builders');
const { catchAsync, appResponse, AppError } = require('../helpers/core');
const { bcryptHelper, jwtHelper } = require('../helpers/libs');
const { userService, tokenService } = require('../services');

exports.login = catchAsync(async (req, res) => {
  const credentials = buildUser(req.body);
  const user = await userService.getOne({
    email: credentials.email,
  });

  if (!user)
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

  const processedUser = user.get({ plain: true });

  const isPasswordValid = await bcryptHelper.compare(
    credentials.password,
    processedUser.password,
  );

  if (!isPasswordValid)
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

  const accessToken = await buildAccessToken(processedUser);
  const refreshToken = await buildRefreshToken(processedUser);

  await tokenService.create(refreshToken);

  delete processedUser.password;

  appResponse({
    res,
    status: 200,
    message: 'Login successful',
    body: {
      user: processedUser,
      accessToken,
      refreshToken,
    },
  });
});

exports.logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const isTokenStored = await tokenService.validate(refreshToken);
  if (!isTokenStored) throw new AppError('Not found', 404, 'NOT_FOUND');

  await tokenService.consume(refreshToken);

  appResponse({
    res,
    status: 200,
    message: 'Logout succesfully',
  });
});

exports.refreshAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const isTokenStored = await tokenService.validate(refreshToken);
  if (!isTokenStored) throw new AppError('Not found', 404, 'NOT_FOUND');

  const { sub: id, context } = jwtHelper.decode(refreshToken);

  const accessToken = await buildAccessToken({ id, ...context });

  appResponse({
    res,
    status: 200,
    body: {
      accessToken,
    },
  });
});
