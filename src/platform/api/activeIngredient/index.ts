import Connection from '../../services/connection';
import { IResponse, IPagination, IPagingRequest } from '../../constants/interfaces';
import { IActiveIngredientListResponseModel } from './models/response';

class ActiveIngredientController {

  private static controller = 'activeIngredient';

  public static GetList = (body: IPagingRequest): Promise<IResponse<IPagination<IActiveIngredientListResponseModel>>> => {
    const result = Connection.POST<IPagingRequest>({
      action: 'list',
      controller: ActiveIngredientController.controller,
      body,
    });

    return result;
  };
};

export default ActiveIngredientController;