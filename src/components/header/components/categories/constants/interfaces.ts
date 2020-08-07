import { ICategoryListResponseModel } from 'platform/api/category/models/response';

export interface ICategoryListWrapper {
  id: number;
  categories: ICategoryListResponseModel[];
};