import jwt from 'jsonwebtoken';
import AuthenticationError from '../exceptions/authentication-error.js';

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return next(new AuthenticationError('Token tidak ditemukan'));
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return next(new AuthenticationError('Token tidak valid'));
  }
};

export default authenticateToken;