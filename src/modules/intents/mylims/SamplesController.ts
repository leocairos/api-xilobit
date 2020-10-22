import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

export default class SamplesController {
  public async getResponse(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const idSample = request.body?.queryResult?.parameters?.sample_id;

    const findSampleDetail = await getConnection('mylims').query(
      `SELECT distinct
        id, identification, collection_point, sample_conclusion,
        lote, sample_status
      FROM
        vw_all_samples vas
      WHERE
        id=${idSample}`,
    );

    if (findSampleDetail[0]) {
      let textSample = `Sample ${findSampleDetail[0]?.id} `;
      textSample += `${findSampleDetail[0]?.identification} `;
      textSample += `Lote ${findSampleDetail[0]?.Lote || ''} `;
      textSample += `[${findSampleDetail[0]?.sample_status}] `;
      textSample += `[${findSampleDetail[0]?.sample_conclusion}]`;

      return response.json({
        fulfillmentMessages: [
          {
            text: {
              text: [textSample],
            },
          },
        ],
      });
    }
    return response.json({
      fulfillmentMessages: [
        {
          text: {
            text: [`Product not found!`],
          },
        },
      ],
    });
  }
}
