import { Request, Response } from 'express';
import logger from '@config/logger';
import remoteIp from '@shared/services/util';

import dialogflowFormatedResponse from './dialogflowFormatedResponse';
import ProductsController from '../intents/protheus/ProductsController';
import SamplesController from '../intents/mylims/SamplesController';

const productsController = new ProductsController();
const samplesController = new SamplesController();

export default class DialogflowFulfillmentController {
  public async intentCall(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const intent = request.body?.queryResult?.intent?.displayName;

    logger.info(
      `POST dialogflowFulfillment intentCall [${intent}] (from ${remoteIp(
        request,
      )})`,
    );

    switch (intent) {
      case 'product.info':
        return productsController.getResponse(request, response);
      case 'sample.info':
        return samplesController.getResponse(request, response);
      default:
        return response.json(dialogflowFormatedResponse(`unrelated intent`));
    }
  }
}
