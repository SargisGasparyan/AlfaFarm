import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IFavoriteListResponseModel } from './models/response';

class FavoriteController {

  private static controller = 'favorite';

  public static GetList = (): Promise<IResponse<IFavoriteListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: FavoriteController.controller,
    });

    return result;
  };

  public static AddOrRemove = (id: number): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body: {},
      action: `addRemove/${id}`,
      controller: FavoriteController.controller,
    });

    return result;
  };
};

export default FavoriteController;