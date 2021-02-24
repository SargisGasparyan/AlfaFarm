import { isValidPhone } from 'platform/services/validator';
import { ICallRequestCreateRequestModel } from 'platform/api/callRequest/models/request';

export function validateForm(this: ICallRequestCreateRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    phoneNumber: false,
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