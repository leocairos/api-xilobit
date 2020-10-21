import { Router } from 'express';
import dialogflowFulfillmentRouter from '@modules/dialogflowFulfillment/dialogflowFulfillment.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.sendStatus(200);
});

routes.use('/dialogflowFulfillment', dialogflowFulfillmentRouter);

export default routes;
