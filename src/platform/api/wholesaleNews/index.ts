import Connection from '../../services/connection';
import { IResponse, IPagination, IPagingRequest } from '../../constants/interfaces';
import { IWholesaleNewsListResponseModel } from './models/response';

class WholesaleNewsController {

  private static controller = 'wholesaleNews';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagination<IWholesaleNewsListResponseModel>>> => {
    const result = Connection.POST<IPagingRequest>({
      action: 'list',
      controller: WholesaleNewsController.controller,
      body,
    });

    return result;
  };
};

export default WholesaleNewsController;