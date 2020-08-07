import { IVerifyRequestModel } from "platform/api/auth/models/request";

export function validateForm(this: IVerifyRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    code: false,
  };

  if (submited && !this.code) {
    errors.code = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}