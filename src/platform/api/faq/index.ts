import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IFAQListResponseModel } from './models/response';

class FAQController {
 
  private static controller = 'faq';

  public static GetList = (): Promise<IResponse<IFAQListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: FAQController.controller,
    });

    return result;
  };
};

export default FAQController;