import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IContactUsBodyModel } from './models';

class SupportController {

  private static controller = 'support';

  public static createRequest = (body: IContactUsBodyModel): Promise<IResponse<any>> => {
    const result = Connection.POST<any>({
      action: 'contact',
      controller: SupportController.controller,
      body,
    });

    return result;
  };
};

export default SupportController;