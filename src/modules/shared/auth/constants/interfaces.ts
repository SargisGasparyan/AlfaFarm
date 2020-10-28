import { VerifyTypeEnum } from './enums';

export interface ISocialResponse {
  _token: {
    accessToken: string;
    idToken: string;
  };
};

export interface IAuthQueryData {
  email: string;
  code: string;
  type: VerifyTypeEnum;
};