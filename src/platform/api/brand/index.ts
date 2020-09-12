import Connection from '../../services/connection';
import { IResponse, IPagingResponse, IPagingRequest } from '../../constants/interfaces';
import { IBrandListResponseModel } from './models/response';

class BrandController {

  private static controller = 'brand';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagingResponse<IBrandListResponseModel>>> => {
    const result = Connection.POST<IPagingRequest>({
      body,
      action: 'list',
      controller: BrandController.controller,
    });

    return result;
  };
};

export default BrandController;