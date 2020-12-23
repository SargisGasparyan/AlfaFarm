import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IProducerListResponseModel } from './models/response';
import { IProducerListRequestModel } from './models/request';

class ProducerController {

  private static controller = 'producer';

  public static GetList = (body: IProducerListRequestModel): Promise<IResponse<IPagingResponse<IProducerListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: ProducerController.controller,
    });

    return result;
  };
};

export default ProducerController;