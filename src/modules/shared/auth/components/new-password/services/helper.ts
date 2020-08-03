import { IRecoveryRequestModel } from "platform/api/auth/models/request";

export function validateForm(this: IRecoveryRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    newPassword: false,
  };

  if (submited && !this.newPassword) {
    errors.newPassword = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}