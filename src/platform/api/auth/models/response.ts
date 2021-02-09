export interface ILoginResponseModel {
  accessToken: string;
  expireDate: string;
  isVerified: boolean;
}

export interface ISendCodeResponseModel {
  phoneNumber: string;
}