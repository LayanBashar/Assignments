export const errorHandler = (err, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" ? "Internal Error" : err.message;
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
