import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

export default class SamplesController {
  public async getResponse(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const idSample = request.body?.queryResult?.parameters?.sample_id;
    const platform = request.body?.queryResult?.fulfillmentMessages?.platform;

    const findSampleDetail = await getConnection('mylims').query(
      `SELECT distinct
        id, identification, sample_conclusion, lote, sample_status, sample_type
      FROM
        vw_all_samples vas
      WHERE
        id=${idSample}`,
    );

    if (findSampleDetail[0]) {
      let textSample = `Amostra ${findSampleDetail[0]?.id} `;
      textSample += `(${findSampleDetail[0]?.sample_type}), `;
      textSample += `${findSampleDetail[0]?.identification}, `;

      if (findSampleDetail[0].Lote) {
        textSample += `${findSampleDetail[0]?.Lote} `;
      }

      textSample += `[${findSampleDetail[0]?.sample_status}]:`;
      textSample += `[${findSampleDetail[0]?.sample_conclusion}]`;

      return response.json(
        /* {
        fulfillmentMessages: [
          {
            text: {
              text: [textSample],
            },
          },
        ],
      } */
        {
          payload: {
            google: {
              expectUserResponse: true,
              richResponse: {
                items: [
                  {
                    simpleResponse: {
                      textToSpeech: textSample,
                    },
                  },
                ],
              },
            },
          },
        },
      );
    }

    return response.json({
      fulfillmentMessages: [
        {
          text: {
            text: [`Amostra não localizada!`],
          },
        },
      ],
    });
  }
}
