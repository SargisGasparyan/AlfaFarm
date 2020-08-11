import { isValidPhone, isValidEmail, isValidDateRange } from 'platform/services/validator';
import { IOrderCreateRequestModel } from 'platform/api/order/models/request';
import { OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';

export function validateForm(this: IOrderCreateRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    fullName: false,
    email: false,
    phoneNumber: false,
    regionId: false,
    address: false,
    deliveryDateFrom: false,
    deliveryDateTo: false,
  };

  if (submited && !this.fullName) {
    errors.fullName = true;
    valid = false;
  }

  if (submited && !isValidPhone(this.phoneNumber)) {
    errors.phoneNumber = true;
    valid = false;
  }

  if (submited && this.email && !isValidEmail(this.email)) {
    errors.email = true;
    valid = false;
  }

  if (submited && !this.userAddressId && !this.regionId) {
    errors.regionId = true;
    valid = false;
  }

  if (submited && !this.userAddressId && (!this.addressText || !this.addressLat || !this.addressLng)) {
    errors.address = true;
    valid = false;
  }

  if (submited && this.deliveryType === OrderDeliveryTypeEnum.Delivery && (!this.deliveryDateFrom || !isValidDateRange(this.deliveryDateFrom, this.deliveryDateTo))) {
    errors.deliveryDateFrom = true;
    valid = false;
  }

  if (submited && this.deliveryType === OrderDeliveryTypeEnum.Delivery && (!this.deliveryDateFrom || !isValidDateRange(this.deliveryDateFrom, this.deliveryDateTo))) {
    errors.deliveryDateTo = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}