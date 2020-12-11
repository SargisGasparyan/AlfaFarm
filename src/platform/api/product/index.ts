import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IProductListRequestModel, IProductRelatedListRequestModel, IProductFilterRequestModel, IGetProductPromotionByQuantityModel } from './models/request';
import { IProductListResponseModel, IProductDetailsResponseModel, IProductPriceRangeResponseModel, IProductAvailablityResponseModel } from './models/response';

class ProductController {

  private static controller = 'product';

  public static GetList = (body: IProductListRequestModel): Promise<IResponse<IPagingResponse<IProductListResponseModel>>> => {
    const result = Connection.POST<IProductListRequestModel>({
      body,
      action: 'list',
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetPriceRange = (body: IProductFilterRequestModel): Promise<IResponse<IProductPriceRangeResponseModel>> => {
    const result = Connection.POST<IProductFilterRequestModel>({
      body,
      action: 'priceRange',
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetAvailablity = (id: number): Promise<IResponse<IProductAvailablityResponseModel>> => {
    const result = Connection.GET({
      action: `availablity/${id}`,
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetRelated = (id: number, body: IProductRelatedListRequestModel): Promise<IResponse<IPagingResponse<IProductListResponseModel>>> => {
    const result = Connection.POST<IProductRelatedListRequestModel>({
      body,
      action: `related/${id}`,
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<IProductDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetProductPromotionByQuantity = (body: IGetProductPromotionByQuantityModel): Promise<IResponse<any>> => {
    const result = Connection.POST<IGetProductPromotionByQuantityModel>({
      body,
      action: 'getProductByQuantity',
      controller: ProductController.controller
    });

    return result;
  } 

  // For SSR to Fill meta tags
  public static ServerDetails = (id: string): Promise<IResponse<IProductDetailsResponseModel>> => {
    const result = Connection.ServerRequest({
      method: 'GET',
      action: 'details',
      query: { id },
      controller: ProductController.controller,
    });

    return result;
  };
};

export default ProductController;