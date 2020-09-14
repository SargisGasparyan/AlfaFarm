export interface IRegisterRequestModel {
  fullName: string;
  password: string;
}

export interface IUserModifyRequestModel {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface IUserPasswordModifyRequestModel {
  newPassword: string;
  currentPassword: string;
}