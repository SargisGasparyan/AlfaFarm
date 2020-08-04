import { OrderStatusEnum } from '../constants/enums';

export interface IOrderListResponseModel {
  id: number;
  status: OrderStatusEnum;
  createdDate: string;
  productQuantity: number;
  address: string;
  totalPrice: number;
};
