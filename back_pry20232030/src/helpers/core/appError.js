class AppError extends Error {
  constructor(message, statusCode, errorCode, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = { AppError };
