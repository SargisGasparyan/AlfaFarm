import Connection from '../../services/connection';
import { IResponse, IPagingResponse, IPagingRequest } from '../../constants/interfaces';
import { ITenderListResponseModel, ITenderDetailsResponseModel } from './models/response';

class TenderController {

  private static controller = 'tender';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagingResponse<ITenderListResponseModel>>> => {
    const result = Connection.POST({
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