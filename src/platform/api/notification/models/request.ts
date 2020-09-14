import { IPagingRequest } from 'platform/constants/interfaces';

export interface INotificationListRequestModel extends IPagingRequest {
  onlyUnseen: boolean;
}