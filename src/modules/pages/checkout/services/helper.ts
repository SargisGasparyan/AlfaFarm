import { isValidPhone, isValidEmail, isValidDateRange } from 'platform/services/validator';
import { IOrderModifyRequestModel } from 'platform/api/order/models/request';
import { OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';

export function validateForm(this: IOrderModifyRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false,
    deliveryDateFrom: false,
    deliveryDateTo: false,
    branchId: false,
  };

  if (submited && !this.firstName) {
    errors.firstName = true;
    valid = false;
  }

  if (submited && !this.lastName) {
    errors.lastName = true;
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

  if (submited && this.deliveryType === OrderDeliveryTypeEnum.Pickup && !this.branchId) {
    errors.branchId = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}