import Connection from '../../services/connection';
import { IResponse, IPagination } from '../../constants/interfaces';
import { IOrderListResponseModel, IOrderDetailsResponseModel } from './models/response';
import { IOrderModifyRequestModel, IOrderListRequestModel } from './models/request';

class OrderController {

  private static controller = 'order';

  public static GetHistory = (body: IOrderListRequestModel): Promise<IResponse<IPagination<IOrderListResponseModel>>> => {
    const result = Connection.POST<IOrderListRequestModel>({
      body,
      action: 'history',
      controller: OrderController.controller,
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<IOrderDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: OrderController.controller,
    });

    return result;
  };

  public static Create = (body: IOrderModifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IOrderModifyRequestModel>({
      body,
      action: '',
      controller: OrderController.controller,
    });

    return result;
  };
};

export default OrderController;