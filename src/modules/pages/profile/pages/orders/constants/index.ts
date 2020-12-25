import { OrderStatusEnum } from 'platform/api/order/constants/enums';

export const statusColorClassNames = {
  [OrderStatusEnum.Pending]: 'G-text-gray-light-color',
  [OrderStatusEnum.AttachedToCarrier]: 'G-text-gray-light-color',
  [OrderStatusEnum.ConfirmedByBranchAdmin]: 'G-text-gray-light-color',
  [OrderStatusEnum.NotCompleted]: 'G-text-gray-light-color',
  [OrderStatusEnum.ReadyToStart]: 'G-yellow-color',
  [OrderStatusEnum.Started]: 'G-orange-color',
  [OrderStatusEnum.Delivered]: 'G-main-color',
  [OrderStatusEnum.Canceled]: 'G-red-color',
  [OrderStatusEnum.Failed]: 'G-red-color',
};