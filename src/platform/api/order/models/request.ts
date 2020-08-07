import { OrderDeliveryTypeEnum } from '../constants/enums';

export interface IOrderCreateRequestModel {
  userAddressId?: number;
  regionId?: number;
  addressText?: string;
  addressLat?: number;
  addressLng?: number;
  fullName: string;
  phoneNumber: string;
  email?: string;
  deliveryType: OrderDeliveryTypeEnum;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  basketIds?: number[];
};