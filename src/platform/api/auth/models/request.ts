import { SocialProvider } from '../constants/enums';

export interface ILoginRequestModel {
  username: string;
  password: string;
};

export interface ISocialLoginRequestModel {
  token: string;
  type: SocialProvider;
};

export interface ISendCodeRequestModel {
  number: string;
  fromForgot: boolean;
};

export interface IVerifyRequestModel {
  phoneNumber: string;
  code: number;
};

export interface IRecoveryRequestModel {
  newPassword: string;
};