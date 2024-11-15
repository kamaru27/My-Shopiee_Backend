import jwt from 'jsonwebtoken';
import env from '../env.js';

export const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.Authorization;

  console.log('first',req.headers);

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: 'Access Token Not Found',
    });
  }

  try {
    const token = authHeader.split(' ')[1];

    const decodeData = jwt.verify(token, env.ADMIN_JWT_SECRET_KEY);

    if (!decodeData) {
      res.status(401).json({
        success: false,
        message: 'Access Token Expired66666',
      });
    }
     req.user= decodeData;

     next();
  } catch (error) {
    return res.status(401).json({
        success: false,
        message: 'Access Token Expired777777',
      });
  }
};
