import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IBrandListResponseModel } from './models/response';
import { IBrandListRequestModel } from './models/request';

class BrandController {

  private static controller = 'brand';

  public static GetList = (body: IBrandListRequestModel): Promise<IResponse<IPagingResponse<IBrandListResponseModel>>> => {
    const result = Connection.POST<IBrandListRequestModel>({
      body,
      action: 'list',
      controller: BrandController.controller,
    });

    return result;
  };
};

export default BrandController;