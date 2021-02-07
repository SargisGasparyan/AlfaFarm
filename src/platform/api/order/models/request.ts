import { OrderDeliveryTypeEnum } from '../constants/enums';
import { IPagingRequest } from 'platform/constants/interfaces';
import { PaymentTypeEnum } from 'platform/constants/enums';

export interface IOrderListRequestModel extends IPagingRequest {};

export interface IOrderModifyRequestModel {
  userAddressId?: number;
  addressText?: string;
  addressLat?: number;
  creditCardId?: number;
  usedBonus?: number;
  addressLng?: number;
  addressBuilding?: string;
  addressEntrance?: string;
  addressFloor?: string;
  addressApartment?: string;
  branchId?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  comment?: string;
  email?: string;
  deliveryType: OrderDeliveryTypeEnum;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  basketIds?: number[];
  paymentType?: PaymentTypeEnum;
};

export interface IOrderResultRequestModel {
  usingBonus: number;
  deliveryType: OrderDeliveryTypeEnum;
};