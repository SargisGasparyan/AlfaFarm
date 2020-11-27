import { isValidEmail } from 'platform/services/validator';
import { IUserModifyRequestModel } from 'platform/api/user/models/request';

export function validateForm(this: IUserModifyRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    firstName: false,
    lastName: false,
    email: false,
    dateOfBirth: false,
  };

  if (submited && !this.firstName) {
    errors.firstName = true;
    valid = false;
  }

  if (submited && !this.dateOfBirth) {
    errors.dateOfBirth = true;
    valid = false;
  }

  if (submited && !this.lastName) {
    errors.lastName = true;
    valid = false;
  }

  if (submited && this.email && !isValidEmail(this.email)) {
    errors.email = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}
