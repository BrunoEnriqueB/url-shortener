import env from '@/config/environment';
import logger from '@/config/logger';
import { HttpError } from '@/domain/errors/http';
import { NextFunction, Request, Response } from 'express';

export default function (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) {
  logger.error(`[ERROR HANDLER] - Error: ${JSON.stringify(err)}`);
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors,
    name: err.name,
    stack: env.NODE_ENV !== 'PRODUCTION' ? err.stack : {}
  });
  return;
}
