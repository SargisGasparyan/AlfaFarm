import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IWholesalePromotionBrandListResponseModel } from './models/response';

class WholesalePromotionController {

  private static controller = 'wholesalePromotion';

  public static GetBrandsList = (text?: string): Promise<IResponse<IWholesalePromotionBrandListResponseModel[]>> => {
    const result = Connection.GET({
      action: 'Brands',
      query: { text },
      controller: WholesalePromotionController.controller,
    });

    return result;
  };
};

export default WholesalePromotionController;