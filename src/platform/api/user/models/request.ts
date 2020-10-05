import { GenderEnum } from '../constants/enums/gender';

export interface IRegisterRequestModel {
  fullName: string;
  password: string;
}

export interface IUserModifyRequestModel {
  fullName: string;
  email: string;
  dateOfBirth?: string;
  gender: GenderEnum;
}

export interface IUserPasswordModifyRequestModel {
  newPassword: string;
  currentPassword: string;
}