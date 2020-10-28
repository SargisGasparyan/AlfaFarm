import { GenderEnum } from '../constants/enums/gender';

export interface IRegisterRequestModel {
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth?: string;
  gender?: GenderEnum;
}

export interface IUserModifyRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: GenderEnum;
}

export interface IUserPasswordModifyRequestModel {
  newPassword: string;
  currentPassword: string;
}