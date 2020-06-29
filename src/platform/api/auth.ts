import Connection from '../services/connection';
import { IResponse } from '../constants/interfaces';
import { OSTypeEnum, LanguageEnum } from '../constants/enums';

const controller = 'auth';

export interface IChoosePasswordRequestModel {
  language?: LanguageEnum;
  osType: OSTypeEnum;
  email: string;
  code: string;
  password: string;
  confirmPassword?: string;
};
export interface IRegisterRequestModel {
  osType: OSTypeEnum,
  email: string,
  code: string,
  password: string,
  language: LanguageEnum,
  // "deviceId": "string",
  // "deviceToken": "string"
};

export interface ISendEmailRequestModel {
  osType: OSTypeEnum;
  email: string;
};

export interface ILoginRequestModel {
  osType: OSTypeEnum;
  email: string;
  password: string;
};

export interface ILoginResponseModel {
  bonusCount: number,
  token: string;
};

export interface ISocialLoginRequestModel {
  osType: OSTypeEnum;
  provider: any;
  token: string;
  language?: LanguageEnum;
};

export interface IVerifyRequestModel {
  email: string,
  code: string,
};

export interface IVerifyPhoneModel {
  email: string,
  code: string,
}


export interface IVerifyRequestModel {
  email: string,
  code: string,
};


class AuthController {

  public static Login = (form: ILoginRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST<ILoginRequestModel>({
      body: form,
      action: 'loginUser',
      controller,
      withoutError: true,
    });

    return result;
  };



  public static Social = (form: ISocialLoginRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST<ISocialLoginRequestModel>({
      body: form,
      action: 'socialLogin',
      controller,
      withoutError: true,
    });

    return result;
  };

  public static SendEmail = (form: ISendEmailRequestModel): Promise<IResponse<null>> => {
    const result = Connection.POST<ISendEmailRequestModel>({
      body: form,
      action: 'sendEmail',
      controller,
      withoutError: true,
    });

    return result;
  };


  public static ForgotSendEmail = (form: ISendEmailRequestModel): Promise<IResponse<null>> => {
    const result = Connection.POST<ISendEmailRequestModel>({
      body: form,
      action: 'forgot/sendEmail',
      controller,
      withoutError: true,
    });

    return result;
  };

  public static Verify = (form: IVerifyRequestModel): Promise<IResponse<null>> => {
    const result = Connection.POST<IVerifyRequestModel>({
      body: form,
      action: 'verify',
      controller,
    });

    return result;
  };

  public static Register = (form: IChoosePasswordRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST<IChoosePasswordRequestModel>({
      body: form,
      action: 'register',
      controller,
      withoutError: true,
    });

    return result;
  };

  public static ForgotRestore = (form: IChoosePasswordRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST<IChoosePasswordRequestModel>({
      body: form,
      action: 'forgot/restore',
      controller,
      withoutError: false,
    });

    return result;
  };

  public static ForgotVerify = (form: IVerifyPhoneModel): Promise<IResponse<null>> => {
    const result = Connection.POST<IVerifyPhoneModel>({
      body: form,
      action: 'forgot/verify',
      controller,
    });

    return result;
  };
};

export default AuthController;