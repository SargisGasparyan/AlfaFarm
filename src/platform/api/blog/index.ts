import Connection    from '../../services/connection';
import { IResponse, IPagingRequest, IPagingResponse } from '../../constants/interfaces';
import { IBlogListResponseModel, IBlogDetailsResponseModel } from './models/response';

class BlogController {
 
  private static controller = 'blog';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagingResponse<IBlogListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: BlogController.controller,
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