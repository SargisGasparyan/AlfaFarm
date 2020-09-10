import Connection from '../../services/connection';
import { IResponse, IPagination, IPagingRequest } from '../../constants/interfaces';
import { ITenderListResponseModel, ITenderDetailsResponseModel } from './models/response';

class TenderController {

  private static controller = 'tender';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagination<ITenderListResponseModel>>> => {
    const result = Connection.POST<IPagingRequest>({
      action: 'list',
      controller: TenderController.controller,
      body,
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<ITenderDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: TenderController.controller,
    });

    return result;
  };
};

export default TenderController;