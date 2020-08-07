export interface ILoginRequestModel {
  username: string;
  password: string;
};

export interface ISendCodeRequestModel {
  phoneNumber: string;
};

export interface IVerifyRequestModel {
  phoneNumber: string;
  code: number;
};

export interface IRecoveryRequestModel {
  newPassword: string;
};