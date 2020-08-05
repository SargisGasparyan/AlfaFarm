import { IPagingRequest } from 'platform/constants/interfaces';
import { ProductSortEnum } from '../constants/enums';

export interface IProductListRequestModel extends IPagingRequest, IProductFilterRequestModel { };

export interface IProductFilterRequestModel {
  text?: string;
  sortBy?: ProductSortEnum;
  hasDiscount?: boolean;
  brandIds?: number[];
  activeIngredientIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: number[];
};

