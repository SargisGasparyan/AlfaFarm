import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';

class BonusCardController {
 
  private static controller = 'bonusCard';

  public static GetReferralLink = (): Promise<IResponse<string>> => {
    const result = Connection.GET({
      action: 'referralLink',
      controller: BonusCardController.controller,
    });

    return result;
  };
};

export default BonusCardController;