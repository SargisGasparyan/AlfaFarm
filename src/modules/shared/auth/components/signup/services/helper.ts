import { IRegisterRequestModel } from "platform/api/user/models/request";

export type RegisterForm = IRegisterRequestModel & { confirmPassword: string };

export function validateForm(this: RegisterForm, submited?: boolean) {
  let valid = true;

  const errors = {
    firstName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    password: false,
    confirmPassword: false,
  };

  if (submited && !this.firstName) {
    errors.firstName = true;
    valid = false;
  }

  if (submited && !this.lastName) {
    errors.lastName = true;
    valid = false;
  }

  if (submited && !this.gender) {
    errors.gender = true;
    valid = false;
  }

  if (submited && !this.dateOfBirth) {
    errors.dateOfBirth = true;
    valid = false;
  }

  if (submited && !this.password) {
    errors.password = true;
    valid = false;
  }

  if (submited && this.confirmPassword !== this.password) {
    errors.confirmPassword = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}