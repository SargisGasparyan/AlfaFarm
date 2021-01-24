import Connection from '../../services/connection';
import { IResponse, IPagingResponse, IPagingRequest } from '../../constants/interfaces';
import { IWholesaleNewsListResponseModel } from './models/response';

class WholesaleNewsController {

  private static controller = 'wholesaleNews';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagingResponse<IWholesaleNewsListResponseModel>>> => {
    const result = Connection.POST({
      action: 'list',
      controller: WholesaleNewsController.controller,
      body,
    });

    return result;
  };
};

export default WholesaleNewsController;