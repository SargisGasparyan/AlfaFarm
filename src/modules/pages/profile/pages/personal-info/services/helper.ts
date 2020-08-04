import { isValidPhone, isValidEmail } from 'platform/services/validator';
import { IUserModifyRequestModel } from 'platform/api/user/models/request';

export function validateForm(this: IUserModifyRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    fullName: false,
    email: false,
    phoneNumber: false,
  };

  if (submited && !this.fullName) {
    errors.fullName = true;
    valid = false;
  }

  if (submited && !isValidPhone(this.phoneNumber)) {
    errors.phoneNumber = true;
    valid = false;
  }

  if (submited && this.email.length && !isValidEmail(this.email)) {
    errors.email = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}