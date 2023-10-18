import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { isDevelopment } from '@/utils/util';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  // const message = ((isDevelopment() || status < 500) && error.message) || 'Something went wrong';
  const message = error.message || 'Something went wrong';
  const code: string | undefined = error.code;
  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
  res.status(status).json({ code: code, message: message });
};

export default errorMiddleware;
