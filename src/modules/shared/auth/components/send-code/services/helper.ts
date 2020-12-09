import { ISendCodeRequestModel } from "platform/api/auth/models/request";
import { isValidPhone } from 'platform/services/validator';

export function validateForm(this: ISendCodeRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    number: false,
    password: false,
  };

  if (submited && !isValidPhone(this.number)) {
    errors.number = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}