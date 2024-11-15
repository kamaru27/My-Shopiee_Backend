import jwt from 'jsonwebtoken';
import env from '../env.js';

export const userAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log('user middleware',req.headers);
  console.log('first',authHeader);

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: 'Access Token Not Found',
    });
  }

  try {
    const token = authHeader.split(' ')[1];

    console.log('token',token);

    const decodeData = jwt.verify(token, env.USER_JWT_SECRET_KEY);
    
    console.log('decodeData',decodeData);

    if (!decodeData) {
      res.status(401).json({
        success: false,
        message: 'Access Token Expired3333333',
      });
    }
     req.user= decodeData;

     next();
  } catch (error) {
    console.log('error',error);
    return res.status(401).json({
        success: false,
        message: 'Access Token Expired111111',
      });
  }
};
