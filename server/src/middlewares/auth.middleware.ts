import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.util';
dotenv.config();

const { ACCESS_TOKEN_SECRET = '' } = process.env;

export const authanticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    logger.info(user);
    req.user = user?.user?._id;
    next();
  });
};
