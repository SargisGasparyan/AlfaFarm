import { OrderDeliveryTypeEnum } from '../constants/enums';
import { IPagingRequest } from 'platform/constants/interfaces';

export interface IOrderListRequestModel extends IPagingRequest {};

export interface IOrderModifyRequestModel {
  userAddressId?: number;
  regionId?: number;
  addressText?: string;
  addressLat?: number;
  addressLng?: number;
  addressBuilding?: string;
  addressEntrance?: string;
  addressFloor?: string;
  addressApartment?: string;
  addressComment?: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  deliveryType: OrderDeliveryTypeEnum;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  basketIds?: number[];
};