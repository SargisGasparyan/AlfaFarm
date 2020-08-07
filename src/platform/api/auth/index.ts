import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { OSTypeEnum, LanguageEnum } from '../../constants/enums';
import { ILoginResponseModel } from './models/response';
import { ILoginRequestModel, ISendCodeRequestModel, IVerifyRequestModel, IRecoveryRequestModel } from './models/request';

const controller = 'auth';

export interface IChoosePasswordRequestModel {
  language?: LanguageEnum;
  osType: OSTypeEnum;
  email: string;
  code: string;
  password: string;
  confirmPassword?: string;
};

export interface ISendEmailRequestModel {
  osType: OSTypeEnum;
  email: string;
};

export interface ISocialLoginRequestModel {
  osType: OSTypeEnum;
  provider: any;
  token: string;
  language?: LanguageEnum;
};

export interface IVerifyPhoneModel {
  email: string,
  code: string,
}

class AuthController {

  public static Login = (form: ILoginRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST<ILoginRequestModel>({
      body: form,
      action: 'login',
      controller,
    });

    return result;
  };

  public static SendCode = (form: ISendCodeRequestModel): Promise<IResponse<number>> => {
    const result = Connection.POST<ISendCodeRequestModel>({
      body: form,
      action: 'code',
      controller,
    });

    return result;
  };

  public static Guest = (): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.GET({
      action: 'guest',
      controller,
    });

    return result;
  };

  public static Verify = (form: IVerifyRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST<IVerifyRequestModel>({
      body: form,
      action: 'verify',
      controller,
    });

    return result;
  };

  public static Recovery = (form: IRecoveryRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IRecoveryRequestModel>({
      body: form,
      action: 'recovery',
      controller,
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