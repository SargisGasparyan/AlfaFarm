import { IPagingRequest } from 'platform/constants/interfaces';

export interface IActiveIngredientListRequestModel extends IPagingRequest {
  categoryId?: number;
};