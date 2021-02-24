import { OrderStatusEnum, OrderDeliveryTypeEnum } from '../constants/enums';
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
  deliveryType: OrderDeliveryTypeEnum;
  deliveryDate: string;
  paymentType: PaymentTypeEnum;
  productQuantity: number;
  address: string;
  building?: string;
  entrance?: string;
  appartment?: string;
  floor?: string;
  usedBonus?: number;
  totalPrice: number;
  totalBonus: number;
  fullName: string;
  phone: string;
  regionName: string;
  cityName: string;
  comment: string;
  baskets: IBasketListResponseModel[];
};

export interface IOrderResultResponseModel {
  totalPrice: number;
  deliveryFee: number;
  receivedBonus: number;
  totalDiscountedPrice: number;
};