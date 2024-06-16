const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const appRoutes = require('./routes');
const { errorHandler } = require('./middlewares/common');
const { rateLimiter } = require('./helpers/libs');
const { AppError } = require('./helpers/core');

const app = express();
const port = 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(rateLimiter(150, 5));

app.use(appRoutes);
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} route not found`, 404));
});

app.use(errorHandler);

process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception.');
  process.exit(1);
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, () => {
    console.log(`[Server] - running at port ${port}`);
  });

  process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to handled promise rejection');
    server.close(() => process.exit(1));
  });
}

module.exports = app;
