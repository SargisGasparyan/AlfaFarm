import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IBasketChangeRequestModel } from './models/request';
import { IBasketListResponseModel } from './models/response';

class BasketController {

  private static controller = 'basket';

  public static GetList = (): Promise<IResponse<IBasketListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: BasketController.controller,
    });

    return result;
  };

  public static Change = (body: IBasketChangeRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IBasketChangeRequestModel>({
      body,
      action: '',
      controller: BasketController.controller,
    });

    return result;
  };

  public static Delete = (basketIds: number[]): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE<{}>({
      body: {},
      action: '',
      query: { basketIds },
      controller: BasketController.controller,
      withoutConfirmModal: true,
    });

    return result;
  };
};

export default BasketController;