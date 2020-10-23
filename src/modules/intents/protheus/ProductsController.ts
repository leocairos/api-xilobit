import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import dialogflowFormatedResponse from '../../dialogflowFulfillment/dialogflowFormatedResponse';

export default class ProductsController {
  public async getResponse(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const idProduct = request.body?.queryResult?.parameters?.product_id;
    const findProductDetail = await getConnection('protheus').query(
      `SELECT rtrim(B1_COD) id, rtrim(B1_DESC) description
          FROM SB1020 WHERE D_E_L_E_T_<>'*' and B1_COD='${idProduct}'`,
    );

    if (findProductDetail[0]) {
      return response.json(
        dialogflowFormatedResponse(
          `Produto ${idProduct} -${findProductDetail[0]?.description}`,
        ),
      );
    }
    return response.json(
      dialogflowFormatedResponse(`Produto '${idProduct}' não encontrado!`),
    );
  }
}
