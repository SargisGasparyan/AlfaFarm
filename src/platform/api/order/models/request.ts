import { OrderDeliveryTypeEnum } from '../constants/enums';
import { IPagingRequest } from 'platform/constants/interfaces';

export interface IOrderListRequestModel extends IPagingRequest {};

export interface IOrderModifyRequestModel {
  userAddressId?: number;
  addressText?: string;
  addressLat?: number;
  addressLng?: number;
  addressBuilding?: string;
  addressEntrance?: string;
  addressFloor?: string;
  addressApartment?: string;
  addressComment?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  comment?: string;
  email?: string;
  deliveryType: OrderDeliveryTypeEnum;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  basketIds?: number[];
};