/**
 * Custom application error class.
 * Allows controllers to throw errors with a specific HTTP status code.
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Maintain proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Global Express error-handling middleware.
 * Must be registered as the last middleware in the stack.
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] ${status} - ${message}`);

  res.status(status).json({ success: false, message });
};
