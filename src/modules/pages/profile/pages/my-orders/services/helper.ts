import { OrderStatusEnum } from 'platform/api/order';

export const orderStatusClass = (status: OrderStatusEnum) => {
  switch (status) {
    case OrderStatusEnum.Canceled: return 'G-pink';
    case OrderStatusEnum.Finished: return 'G-main-color';
    default: return '';
  }
}