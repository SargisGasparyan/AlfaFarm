import { isValidPhone, isValidEmail } from 'platform/services/validator';
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

  if (submited && this.deliveryDateFrom && new Date(this.deliveryDateFrom) < new Date()) {
    errors.deliveryDateFrom = true;
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

  if (submited && this.deliveryType === OrderDeliveryTypeEnum.Pickup && !this.branchId) {
    errors.branchId = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}