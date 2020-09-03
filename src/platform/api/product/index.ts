import Connection from '../../services/connection';
import { IResponse, IPagination, IPaging } from '../../constants/interfaces';
import { IProductListRequestModel, IProductRelatedListRequestModel } from './models/request';
import { IProductListResponseModel, IProductDetailsResponseModel } from './models/response';

class ProductController {

  private static controller = 'product';

  public static GetList = (body: IProductListRequestModel): Promise<IResponse<IPagination<IProductListResponseModel>>> => {
    const result = Connection.POST<IProductListRequestModel>({
      body,
      action: 'list',
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetRelated = (id: number, body: IProductRelatedListRequestModel): Promise<IResponse<IPagination<IProductListResponseModel>>> => {
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