import { Request, Response } from 'express';
import logger from '@config/logger';
import { remoteIp } from '@shared/services/util';

export default class DialogflowFulfillmentController {
  public async activeService(
    request: Request,
    response: Response,
  ): Promise<Response> {
    logger.info(
      `POST dialogflowFulfillment default alreadey response (from ${remoteIp(
        request,
      )})...`,
    );

    return response.json({
      fulfillmentMessages: [
        {
          text: {
            text: [' Dialogflow Fulfillment active'],
          },
        },
      ],
    });
  }
}
