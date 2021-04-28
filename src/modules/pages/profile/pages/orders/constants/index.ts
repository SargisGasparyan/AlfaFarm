import {OrderStatusEnum, PrescriptionsEnum} from 'platform/api/order/constants/enums';

export const statusColorClassNames = {
  [OrderStatusEnum.Pending]: 'G-clr-orange',
  [OrderStatusEnum.AttachedToCarrier]: 'G-clr-orange',
  [OrderStatusEnum.ConfirmedByBranchAdmin]: 'G-clr-orange',
  [OrderStatusEnum.NotCompleted]: 'G-clr-light-gray',
  [OrderStatusEnum.ReadyToStart]: 'G-clr-yellow',
  [OrderStatusEnum.Started]: 'G-clr-orange',
  [OrderStatusEnum.Delivered]: 'G-clr-main',
  [OrderStatusEnum.Canceled]: 'G-clr-red',
  [OrderStatusEnum.Failed]: 'G-clr-red',
};

export const statusColorPrescriptionsClassNames = {
  [PrescriptionsEnum.Delivered]: 'G-clr-green',
  [PrescriptionsEnum.Failed]: 'G-clr-red',
  [PrescriptionsEnum.Pending]: 'G-clr-orange',
};
