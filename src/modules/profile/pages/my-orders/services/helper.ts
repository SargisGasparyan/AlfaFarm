import { OrderStatusEnum } from 'platform/api/order';

export const orderStatusClass = (status: OrderStatusEnum) => {
  switch (status) {
    case OrderStatusEnum.Canceled: return 'P-G-pink';
    case OrderStatusEnum.Finished: return 'P-G-main-color';
    default: return '';
  }
}