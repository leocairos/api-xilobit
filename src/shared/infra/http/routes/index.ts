import { Router } from 'express';
import dialogflowFulfillmentRouter from '@modules/dialogflowFulfillment/dialogflowFulfillment.routes';

const routes = Router();

routes.use('/dialogflowFulfillment', dialogflowFulfillmentRouter);

export default routes;
