import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IBannerListResponseModel } from './models/response';

class BannerController {

  private static controller = 'banner';

  public static GetList = (): Promise<IResponse<IBannerListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: BannerController.controller,
    });

    return result;
  };
};

export default BannerController;