import { IPagingRequest } from 'platform/constants/interfaces';

export interface IProductListRequestModel extends IPagingRequest, IProductFilterRequestModel { };

export interface IProductFilterRequestModel {
  text?: string;
  sortBy?: ProductSortEnum;
  brandIds?: number[];
  activeIngredientIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: number[];
};

export enum ProductSortEnum {
  Alphabetical = 1,
  PriceLowToHigh,
  PriceHighToLow,
  DiscountLowToHigh,
  DiscountHighToLow,
};