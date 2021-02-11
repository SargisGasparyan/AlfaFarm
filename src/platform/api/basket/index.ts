import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IBasketChangeRequestModel } from './models/request';
import { IBasketListResponseModel, ISavedBasketListResponseModel, IBasketResponseModel, IBasketChangeResponseModel } from './models/response';
import Settings from 'platform/services/settings';

class BasketController {

  private static controller = 'basket';

  public static GetList = (): Promise<IResponse<IBasketResponseModel>> => {
    const result = Connection.GET({
      action: '',
      controller: BasketController.controller,
    });

    return result;
  };

  public static GetCount = (): Promise<IResponse<number>> => {
    const result = Connection.GET({
      action: 'count',
      controller: BasketController.controller,
    });

    return result;
  };

  public static Change = (body: IBasketChangeRequestModel): Promise<IResponse<IBasketChangeResponseModel>> => {
    const result = Connection.PUT({
      body,
      action: '',
      controller: BasketController.controller,
    });

    return result;
  };

  public static ChangeWithAdd = (body: IBasketChangeRequestModel): Promise<IResponse<IBasketChangeResponseModel>> => {
    const result = Connection.PUT({
      body,
      action: 'Update',
      controller: BasketController.controller,
    });

    return result;
  };

  
  public static DeleteAll = (): Promise<IResponse<IBasketChangeResponseModel>> => {
    const result = Connection.DELETE({
      body: {},
      action: 'All',
      controller: BasketController.controller,
    });

    return result;
  };

  public static ChangeList = (body: IBasketChangeRequestModel[]): Promise<IResponse<IBasketChangeResponseModel>> => {
    const result = Connection.PUT({
      body,
      action: 'UpdateFromRepeatList',
      controller: BasketController.controller,
    });

    return result;
  };

  public static Save = (body: number[]): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body,
      action: 'save',
      controller: BasketController.controller,
    });

    return result;
  };

  public static GetSavedList = (): Promise<IResponse<ISavedBasketListResponseModel[]>> => {
    const result = Connection.GET({
      action: 'savedList',
      controller: BasketController.controller,
    });

    return result;
  };

  public static GetSavedItemsList = (id: number): Promise<IResponse<IBasketResponseModel>> => {
    const result = Connection.GET({
      action: `saved/${id}`,
      controller: BasketController.controller,
    });

    return result;
  };

  public static DeleteSaved = (id: number): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE({
      body: {},
      action: `saved/${id}`,
      controller: BasketController.controller,
    }, Settings.translations.delete_saved_product_basket);

    return result;
  };

  public static Delete = (productId: number, isPackage?: boolean): Promise<IResponse<IBasketChangeResponseModel>> => {
    const result = Connection.DELETE({
      body: {},
      action: `${productId}/${isPackage}`,
      controller: BasketController.controller,
      withoutConfirmModal: true,
    }, Settings.translations.delete_product_from_basket);

    return result;
  };
};

export default BasketController;
