import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IActiveIngredientListResponseModel } from './models/response';
import { IActiveIngredientListRequestModel } from './models/request';

class ActiveIngredientController {

  private static controller = 'activeIngredient';

  public static GetList = (body: IActiveIngredientListRequestModel): Promise<IResponse<IPagingResponse<IActiveIngredientListResponseModel>>> => {
    const result = Connection.POST<IActiveIngredientListRequestModel>({
      action: 'list',
      controller: ActiveIngredientController.controller,
      body,
    });

    return result;
  };
};

export default ActiveIngredientController;