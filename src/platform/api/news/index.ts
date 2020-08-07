import Connection    from '../../services/connection';
import { IResponse, IPagingRequest, IPagination } from '../../constants/interfaces';
import { INewsListResponseModel, INewsDetailsResponseModel } from './models/response';

class NewsController {
 
  private static controller = 'news';

  public static GetList = (paging: IPagingRequest): Promise<IResponse<IPagination<INewsListResponseModel>>> => {
    const result = Connection.POST({
      action: 'list',
      controller: NewsController.controller,
      body: paging
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<INewsDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: NewsController.controller,
    });

    return result;
  };
};

export default NewsController;