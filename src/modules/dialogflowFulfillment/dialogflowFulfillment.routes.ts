import { Router } from 'express';

import ensureKeyAuthorization from '@shared/infra/http/middlewares/ensureKeyAuthorization';

import DialogflowFulfillmentController from './dialogflowFulfillmentController';

const dialogflowFulfillmentRouter = Router();
const dialogflowFulfillmentController = new DialogflowFulfillmentController();

dialogflowFulfillmentRouter.post(
  '/',
  ensureKeyAuthorization,
  dialogflowFulfillmentController.intentCall,
);

export default dialogflowFulfillmentRouter;
