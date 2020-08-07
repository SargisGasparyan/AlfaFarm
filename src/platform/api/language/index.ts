import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { ILanguageListResponseModel } from './models/response';

class LanguageController {
 
  private static controller = 'language';

  public static GetList = (): Promise<IResponse<ILanguageListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: LanguageController.controller,
    });

    return result;
  };
};

export default LanguageController;