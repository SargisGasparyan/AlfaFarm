import { GenderEnum } from '../constants/enums/gender';

export interface IRegisterRequestModel {
  firstName: string;
  lastName: string;
  password: string;
  referralCode?: string;
  dateOfBirth?: string;
  gender?: GenderEnum;
};

export interface IUserModifyRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: GenderEnum;
};

export interface IUserPasswordModifyRequestModel {
  newPassword: string;
  currentPassword: string;
};

export interface IPreferredProductUpdateRequestModel {
  newProductId: number;
  oldProductId?: number;
};
