import { IPagingRequest } from 'platform/constants/interfaces';
import { ProductSortEnum } from '../constants/enums';

export interface IProductListRequestModel extends IPagingRequest, IProductFilterRequestModel { };

export interface IProductRelatedListRequestModel extends IPagingRequest { };

export interface IProductFilterRequestModel {
  productText?: string;
  sortBy?: ProductSortEnum;
  hasDiscount?: boolean;
  brandIds?: number[];
  producerIds?: number[];
  activeIngredientIds?: number[];
  minPrice?: number;
  maxPrice?: number | undefined;
  categoryIds?: number[];
};
export interface IGetProductPromotionByQuantityModel {
  productId: number | null;
  quantity: number;
  isPackage: boolean;
}
