import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import logger from '@config/logger';
import { remoteIp } from '@shared/services/util';

const ensureKeyAuthorization = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const accessKey = request.headers['x-bot-key'];
  if (!accessKey) {
    logger.warn(`Token is missing from ${remoteIp(request)}`);
    throw new AppError('Token is missing.', 401);
  }

  if (accessKey === process.env.KEY_FULFILLMENT_WEBHOOK) {
    return next();
  }
  logger.warn(`Invalid token from ${remoteIp(request)}`);
  throw new AppError('Invalid token.', 401);
};

export default ensureKeyAuthorization;
