import { NotificationTypeEnum } from 'platform/constants/enums';

export interface INotificationListResponseModel {
  id: number;
  dataId?: number;
  title: string;
  type: NotificationTypeEnum;
  description: string;
  createdDate: string;
}