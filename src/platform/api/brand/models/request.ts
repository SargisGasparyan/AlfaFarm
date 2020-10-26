import { IPagingRequest } from 'platform/constants/interfaces';

export interface IBrandListRequestModel extends IPagingRequest {
  categoryId?: number;
};