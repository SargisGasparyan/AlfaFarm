import Connection from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';

const controller = 'brand';

export interface IBrand {
  _id: string;
  name: string;
  logo: string;
  productCount: number;
}

export interface IBrandFilter {
  pageNo: number;
  limit: number;
  search?: string;
  categoryId?: string;
};

class BrandController {

  public static Filter = (body: IBrandFilter): Promise<IResponse<IPagination<IBrand>>> => {
    const result = Connection.POST({
      body,
      action: 'filter',
      controller,
    });

    return result;
  };

  public static List = (pageNo: number, limit: number): Promise<IResponse<IPagination<IBrand>>> => {
    const result = Connection.GET({
      action: 'list',
      query: { pageNo, limit },
      controller,
    });

    return result;
  };
};

export default BrandController;