import { IPagingRequest } from 'platform/constants/interfaces';

export interface IProducerListRequestModel extends IPagingRequest {
  categoryId?: number;
};