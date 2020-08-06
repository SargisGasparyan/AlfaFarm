import { OrderStatusEnum } from '../constants/enums';

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
  productQuantity: number;
  address: string;
  totalPrice: number;
  fullName: string;
  phone: string;
  regionName: string;
  cityName: string;
  baskets: IOrderDetailsBasketItemResponseModel[];
};

export interface IOrderDetailsBasketItemResponseModel {
  id: number;
  productId: number;
  productPhoto: string;
  price: number;
  unitName: string;
  unitQuantity: number;
  productTitle: string;
  productQuantity: number;
};
