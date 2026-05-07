import jwt from 'jsonwebtoken';

/**
 * Authentication middleware.
 * Reads the `Authorization: Bearer <token>` header, verifies the JWT,
 * and attaches the decoded payload to `req.user` on success.
 *
 * On failure (missing header, malformed token, expired token, wrong secret)
 * responds HTTP 401 and does NOT call next().
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized: Invalid or expired token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized: Invalid or expired token' });
  }
};
