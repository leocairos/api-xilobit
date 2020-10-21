import { Request, Response } from 'express';
import logger from '@config/logger';
import remoteIp from '@shared/services/util';
import { createConnection, getConnection } from 'typeorm';

export default class DialogflowFulfillmentController {
  public async activeService(
    request: Request,
    response: Response,
  ): Promise<Response> {
    logger.info(
      `POST dialogflowFulfillment alreadey active response (from ${remoteIp(
        request,
      )})...`,
    );

    const intent = request.body?.queryResult?.intent?.displayName;

    if (intent) {
      if (intent === 'product.info') {
        try {
          await createConnection();
        } catch {
          //
        }

        const idProduct = request.body?.queryResult?.parameters?.product_id;
        const findProductDetail = await getConnection().query(
          `SELECT rtrim(B1_COD) id, rtrim(B1_DESC) description
          FROM SB1020 WHERE D_E_L_E_T_<>'*' and B1_COD='${idProduct}'`,
        );

        const productDetail = findProductDetail.map(product => {
          return {
            id: product.id,
            description: product.description,
          };
        });

        await Promise.all(productDetail);

        return response.json({
          fulfillmentMessages: [
            {
              text: {
                text: [`Product descripton: ${productDetail[0]?.description}`],
              },
            },
          ],
        });
      }
    }

    return response.json({
      fulfillmentMessages: [
        {
          text: {
            text: [`Dialogflow Fulfillment active`],
          },
        },
      ],
    });
  }
}
