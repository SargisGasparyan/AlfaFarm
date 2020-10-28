import { ILoginRequestModel } from "platform/api/auth/models/request";
import { isValidPhone } from 'platform/services/validator';

export function validateForm(this: ILoginRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    username: false,
    password: false,
  };

  if (submited && !isValidPhone(this.username)) {
    errors.username = true;
    valid = false;
  }

  if (submited && !this.password) {
    errors.password = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}