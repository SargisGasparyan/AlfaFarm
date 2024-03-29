import Connection    from '../../services/connection';
import { IResponse, IPagingRequest, IPagingResponse } from '../../constants/interfaces';
import { INewsListResponseModel, INewsDetailsResponseModel } from './models/response';

class NewsController {
 
  private static controller = 'news';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagingResponse<INewsListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: NewsController.controller,
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