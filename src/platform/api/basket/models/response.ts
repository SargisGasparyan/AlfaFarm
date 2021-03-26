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
  havePackage: boolean;
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
  discountedPrice: number;
  promotion: IPromotionModel;
  isPackage: boolean;
  priceInfo: {
    price: number;
    discountedPrice: number;
    bonus: number;
  }; // Will be set using basket logic
};

export interface ISavedBasketListResponseModel {
  id: number;
  itemsCount: number;
};

export interface IBasketChangeResponseModel extends IBasketResponseModel {
  bonus: number;
  totalPrice: number;
};
