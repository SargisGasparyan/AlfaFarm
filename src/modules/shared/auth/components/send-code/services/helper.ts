import { ISendCodeRequestModel } from "platform/api/auth/models/request";
import { isValidPhone } from 'platform/services/validator';

export function validateForm(this: ISendCodeRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    phoneNumber: false,
    password: false,
  };

  if (submited && !isValidPhone(this.phoneNumber)) {
    errors.phoneNumber = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}