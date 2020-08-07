import Connection from '../../services/connection';
import { IResponse, IPagination, IPagingRequest } from '../../constants/interfaces';
import { IBrandListResponseModel } from './models/response';

class BrandController {

  private static controller = 'brand';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagination<IBrandListResponseModel>>> => {
    const result = Connection.POST({
      action: 'list',
      controller: BrandController.controller,
      body,
    });

    return result;
  };
};

export default BrandController;