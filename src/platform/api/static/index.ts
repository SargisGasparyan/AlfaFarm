import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IStaticResponseModel } from './models/response';

class StaticController {

  private static controller = 'static';

  public static GetPrivacyPolicy = (): Promise<IResponse<IStaticResponseModel>> => {
    const result = Connection.GET({
      action: 'privacy',
      controller: StaticController.controller,
    });

    return result;
  };

  public static GetTermsAndConditions = (): Promise<IResponse<IStaticResponseModel>> => {
    const result = Connection.GET({
      action: 'terms',
      controller: StaticController.controller,
    });

    return result;
  };

  public static GetBonusCard = (): Promise<IResponse<IStaticResponseModel>> => {
    const result = Connection.GET({
      action: 'bonusCard',
      controller: StaticController.controller,
    });

    return result;
  };
};

export default StaticController;
