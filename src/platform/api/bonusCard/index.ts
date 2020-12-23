import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IBonusCardDetailsRequestModel } from './models/request';
import { IBonusCardDetailsResponseModel, IBonusCardDetailsWithHistoryResponseModel } from './models/response';

class BonusCardController {
 
  private static controller = 'bonusCard';

  public static GetReferralLink = (): Promise<IResponse<string>> => {
    const result = Connection.GET({
      action: 'referralLink',
      controller: BonusCardController.controller,
    });

    return result;
  };

  public static GetDetailsWithHistory = (body: IBonusCardDetailsRequestModel): Promise<IResponse<IBonusCardDetailsWithHistoryResponseModel>> => {
    const result = Connection.POST({
      action: 'getDetailsWithHistory',
      controller: BonusCardController.controller,
      body,
    });

    return result;
  };
};

export default BonusCardController;