import { IContactUsBodyModel } from 'platform/api/support/models';
import { isValidEmail } from 'platform/services/validator';

export function validateForm(this: IContactUsBodyModel, submited?: boolean) {
  let valid = true;

  const errors = {
    name: false,
    email: false,
    content: false
  };

  if (submited && !this.name) {
    errors.name = true;
    valid = false;
  }

  if (submited && !isValidEmail(this.email)) {
    errors.email = true;
    valid = false;
  }

  if (submited && !this.content.trim()) {
    errors.content = true;
    valid = false;
  }
  return {
    errors,
    valid,
  };
}