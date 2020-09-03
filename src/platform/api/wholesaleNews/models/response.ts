import { IProductListResponseModel } from 'platform/api/product/models/response';

export interface IWholesaleNewsListResponseModel {
  id: number;
  description: string;
  product: IProductListResponseModel;
};