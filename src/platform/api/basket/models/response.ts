import { IPromotionModel } from 'platform/api/product/models/response';

export interface IBasketResponseModel {
  totalPrice: number;
  totalDiscountedPrice: number;
  totalBonus: number;
  bonus: number;
  items: IBasketListResponseModel[];
};

export interface IBasketListResponseModel {
  id: number;
  productId: number;
  productPhoto: string;
  price: number;
  packagePrice: number;
  unitName: string;
  totalPrice: number;
  unitQuantity: number;
  productTitle: string;
  productQuantity: number;
  productStockQuantity: boolean;
  promotion: IPromotionModel;
  isPackage: boolean,
};

export interface ISavedBasketListResponseModel {
  id: number;
  itemsCount: number;
};

export interface IBasketChangeResponseModel extends IBasketResponseModel {
  bonus: number;
  totalPrice: number;
};
