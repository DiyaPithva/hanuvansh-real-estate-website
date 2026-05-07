/**
 * Admin authorization middleware.
 * Must be used AFTER authMiddleware in the middleware chain.
 *
 * Checks that `req.user.role === 'admin'`.
 * If true: calls next().
 * If false or missing: responds HTTP 403 and does NOT call next().
 */
export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res
    .status(403)
    .json({ success: false, message: 'Forbidden: Admin access required' });
};
