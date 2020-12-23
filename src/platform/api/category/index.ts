import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { ICategoryListResponseModel } from './models/response';

const controller = 'category';

class CategoryController {

  public static GetList = (parentId?: number): Promise<IResponse<ICategoryListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      query: { parentId },
      controller,
    });

    return result;
  };
};

export default CategoryController;