import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IOrderListResponseModel, IOrderDetailsResponseModel, IOrderResultResponseModel, IOrderCreateResponeModel } from './models/response';
import { IOrderCreateRequestModel, IOrderListRequestModel, IOrderResultRequestModel } from './models/request';

class OrderController {

  private static controller = 'order';

  public static GetHistory = (body: IOrderListRequestModel): Promise<IResponse<IPagingResponse<IOrderListResponseModel>>> => {
    const result = Connection.POST({
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


  public static GetResult = (body: IOrderResultRequestModel): Promise<IResponse<IOrderResultResponseModel>> => {
    const result = Connection.POST({
      body,
      action: 'getOrderResult',
      controller: OrderController.controller,
    });

    return result;
  };

  public static Create = (body: IOrderCreateRequestModel): Promise<IResponse<IOrderCreateResponeModel>> => {
    const result = Connection.POST({
      body,
      action: '',
      controller: OrderController.controller,
    });

    return result;
  };

  public static Repeat = (id: number): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body: {},
      action: `repeat/${id}`,
      controller: OrderController.controller,
    });

    return result;
  };
  public static Cancel = (id: number): Promise<IResponse<boolean>> => {
    const result = Connection.PUT({
      body: {},
      action: `cancel/${id}`,
      controller: OrderController.controller
    });

    return result;
  }
};

export default OrderController;