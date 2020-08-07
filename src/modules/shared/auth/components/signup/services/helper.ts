import { IRegisterRequestModel } from "platform/api/user/models/request";

export function validateForm(this: IRegisterRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    fullName: false,
    password: false,
  };

  if (submited && !this.password) {
    errors.fullName = true;
    valid = false;
  }

  if (submited && !this.fullName) {
    errors.password = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}