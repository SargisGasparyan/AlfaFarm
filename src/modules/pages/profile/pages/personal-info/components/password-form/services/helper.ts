import { IUserPasswordModifyRequestModel } from 'platform/api/user/models/request';

export type ChangePasswordForm = IUserPasswordModifyRequestModel & { confirmPassword: string }; 

export function validateForm(this: ChangePasswordForm, submited?: boolean) {
  let valid = true;

  const errors = {
    newPassword: false,
    currentPassword: false,
    confirmPassword: false,
  };

  if (submited && !this.newPassword) {
    errors.newPassword = true;
    valid = false;
  }

  if (submited && !this.currentPassword) {
    errors.currentPassword = true;
    valid = false;
  }

  if (submited && this.confirmPassword !== this.newPassword) {
    errors.confirmPassword = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}