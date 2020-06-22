import { ICategory } from 'platform/api/category';

export interface ICategoryList {
  choosedId: string | null;
  list: ICategory[];
};