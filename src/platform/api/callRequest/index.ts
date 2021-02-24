import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { ICallRequestCreateRequestModel } from './models/request';

class CallRequestController {

  private static controller = 'callRequest';

  public static Create = (body: ICallRequestCreateRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      action: '',
      controller: CallRequestController.controller,
      body,
    });

    return result;
  };
};

export default CallRequestController;