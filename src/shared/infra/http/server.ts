/* eslint-disable no-case-declarations */
import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/infra/typeorm';

import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import helmet from 'helmet';
import { errors } from 'celebrate';
import logger from '@config/logger';

import express, { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

require('events').EventEmitter.defaultMaxListeners = 12;

const app = express();

app.use(cors());
app.use(express.json());

app.use(helmet());
app.disable('x-powered-by');

app.use(
  morgan(
    ':method :url :remote-addr - :remote-user :status :res[content-length] B :response-time ms',
    { stream: logger.stream },
  ),
);

app.use(compression());
app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  logger.warn(`***ERROR***${err.name}: ${err.message}`);

  return response.status(500).json({
    status: 'error',
    message: `Internal server error! ${err.name}: ${err.message} `,
  });
});

const appPort = process.env.APP_PORT;

app.listen(appPort, async () => {
  logger.info(
    `\n${'#'.repeat(100)}\n${' '.repeat(
      26,
    )} Service now running on port '${appPort}' (${
      process.env.NODE_ENV
    }) ${' '.repeat(26)} \n${'#'.repeat(100)}\n`,
  );
});
