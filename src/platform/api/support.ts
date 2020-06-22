import Connection from '../services/connection';
import { IResponse } from '../constants/interfaces';

const controller = 'support';

export interface ISupportRequestModel {
  name: string;
  email: string;
  phone: string;
  message: string;
};

class SupportController {

  public static Send = (body: ISupportRequestModel): Promise<IResponse<string>> => {
    const result = Connection.POST<ISupportRequestModel>({
      body,
      action: '',
      controller,
    });

    return result;
  };
};

export default SupportController;