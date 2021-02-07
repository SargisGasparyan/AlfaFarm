import { IPromotionModel } from 'platform/api/product/models/response';

export interface IFavoriteListResponseModel {
  id: number;
  title: string;
  price: number;
  isFavorite: boolean;
  discount?: number;
  imagePath?: string;
  unitName: string;
  unitQuantity: number;
  promotion: IPromotionModel;
};
