import { OrderStatusEnum } from '../constants/enums';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';
import { PaymentTypeEnum } from 'platform/constants/enums';

export interface IOrderListResponseModel {
  id: number;
  status: OrderStatusEnum;
  createdDate: string;
  productQuantity: number;
  address: string;
  totalPrice: number;
};

export interface IOrderDetailsResponseModel {
  id: number;
  status: OrderStatusEnum;
  createdDate: string;
  deliveryDate: string;
  paymentType: PaymentTypeEnum;
  productQuantity: number;
  address: string;
  totalPrice: number;
  fullName: string;
  phone: string;
  regionName: string;
  cityName: string;
  baskets: IBasketListResponseModel[];
};

export interface IOrderResultResponseModel {
  totalPrice: number;
  deliveryFee: number;
  receivedBonus: number;
  totalDiscountedPrice: number;
};