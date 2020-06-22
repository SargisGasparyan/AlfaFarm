import Connection from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';

const controller = 'promotion';

export enum PromotionTypeEnum {
  Product = 1,
  Category,
};

export interface IPromotion {
  _id: string;
  type: PromotionTypeEnum;
  name: string;
  cover: string;
  product: string | null;
  category: string | null;
};

export interface IPromotionDetails {
  _id: string;
  type: PromotionTypeEnum;
  name: string;
  cover: string;
  product: string | null;
  category: string | null;
};

class PromotionController {

  public static List = (pageNo: number, limit: number): Promise<IResponse<IPagination<IPromotion>>> => {
    const result = Connection.GET({
      action: 'list',
      query: { pageNo, limit },
      controller,
    });

    return result;
  };

  public static Details = (body: any) : Promise<IResponse<any>> =>  {
    const result = Connection.POST({
      body,
      action: 'detailsForUser',
      controller,
    });

    return result;
  }
};

export default PromotionController;