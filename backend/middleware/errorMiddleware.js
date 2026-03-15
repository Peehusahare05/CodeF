function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const payload = {
    message: err.message || "Internal Server Error",
  };

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
}

module.exports = { notFound, errorHandler };
