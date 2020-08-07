import Connection    from '../../services/connection';
import { IResponse, IPagingRequest, IPagination } from '../../constants/interfaces';
import { IBlogListResponseModel, IBlogDetailsResponseModel } from './models/response';

class BlogController {
 
  private static controller = 'blog';

  public static GetList = (paging: IPagingRequest): Promise<IResponse<IPagination<IBlogListResponseModel>>> => {
    const result = Connection.POST({
      action: 'list',
      controller: BlogController.controller,
      body: paging
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<IBlogDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: BlogController.controller,
    });

    return result;
  };
};

export default BlogController;