const { AppError, catchAsync } = require('../../helpers/core');
const { jwtHelper } = require('../../helpers/libs');
const { userService } = require('../../services');

const isAccessToken = token => {
  return token.context.type === 'access' && token.context.email && token.sub;
};

const extractUser = async token => {
  const user = await userService
    .getOne({
      id: token.sub,
    })
    .then(user => user.get({ plain: true }));

  return user;
};

const handleAuthentication = async token => {
  if (!token)
    throw new AppError("Token doesn't exists", 401, 'AUTHENTICATION_ERROR');

  const isValid = jwtHelper.verify(token);
  if (!isValid) throw new AppError('Invalid token', 498);

  const content = jwtHelper.decode(token);
  if (!isAccessToken(content))
    throw new AppError('Invalid access token', 498, 'AUTHENTICATION_ERROR');

  const user = await extractUser(content);
  if (!user)
    throw new AppError('Invalid access token', 498, 'AUTHENTICATION_ERROR');

  return { user };
};

const handleAuth = catchAsync(async (req, res, next) => {
  const { user } = await handleAuthentication(req.headers.authorization);

  req.user = user;

  return next();
});

module.exports = { handleAuth };
