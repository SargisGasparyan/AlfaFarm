import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IProductListRequestModel, IProductRelatedListRequestModel, IProductFilterRequestModel, IGetProductPromotionByQuantityModel } from './models/request';
import { IProductListResponseModel, IProductDetailsResponseModel, IProductPriceRangeResponseModel, IProductAvailablityResponseModel, IProductSearcResponseModel } from './models/response';

class ProductController {

  private static controller = 'product';

  public static Search = (search: string): Promise<IResponse<IProductSearcResponseModel>> => {
    const result = Connection.POST({
      body: { search },
      action: 'search',
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetList = (body: IProductListRequestModel): Promise<IResponse<IPagingResponse<IProductListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetPriceRange = (body: IProductFilterRequestModel): Promise<IResponse<IProductPriceRangeResponseModel>> => {
    const result = Connection.POST({
      body,
      action: 'priceRange',
      controller: ProductController.controller,
      unabortable: true,
    });

    return result;
  };

  public static GetSpecialProducts = (): Promise<IResponse<IProductListResponseModel>> => {
    const result = Connection.GET({
      action: `specialOffers`,
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

  public static GetCategoryList = (id: number, limit: number): Promise<IResponse<IProductAvailablityResponseModel>> => {
    const result = Connection.GET({
      action: `CategoryList?categoryId=${id}&productsLimit=${limit}`,
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetRelated = (id: number, body: IProductRelatedListRequestModel): Promise<IResponse<IPagingResponse<IProductListResponseModel>>> => {
    const result = Connection.POST({
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
    const result = Connection.POST({
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
