import { isValidEmail } from 'platform/services/validator';

export function validateForm(this: { name: string; email: string; text: string; }, submited?: boolean) {
  let valid = true;

  const errors = {
    name: false,
    email: false,
    text: false,
  };

  if (submited && !this.name) {
    errors.name = true;
    valid = false;
  }

  if (submited && !this.text) {
    errors.text = true;
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