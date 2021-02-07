import { NotificationChoiceTypeEnum, NotificationTypeEnum } from 'platform/constants/enums';

export interface INotificationListResponseModel {
  id: number;
  dataId?: number;
  title: string;
  seen: boolean;
  type: NotificationTypeEnum;
  hasChoice: boolean;
  description: string;
  createdDate: string;
}

export interface INotificationAnswerResponseModel {
  id: number;
  description: string;
  cancelText: string;
  confirmText: string;
  answerType: NotificationChoiceTypeEnum;
  photoPath: string;
  title: string;
}
