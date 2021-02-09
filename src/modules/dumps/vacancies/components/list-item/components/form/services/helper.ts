import { IVacancyCareerRequestModel } from 'platform/api/vacancy/models/request';
import { isValidEmail } from 'platform/services/validator';

export function validateForm(this: IVacancyCareerRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    firstName: false,
    lastName: false,
    email: false,
  };

  if (submited && !this.firstName) {
    errors.firstName = true;
    valid = false;
  }

  if (submited && !this.lastName) {
    errors.lastName = true;
    valid = false;
  }

  if (submited && !isValidEmail(this.email)) {
    errors.email = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}