import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { ILoginResponseModel } from './models/response';
import { ILoginRequestModel, ISendCodeRequestModel, IVerifyRequestModel, IRecoveryRequestModel, ISocialLoginRequestModel } from './models/request';

const controller = 'auth';

class AuthController {

  public static Login = (form: ILoginRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST({
      body: form,
      action: 'login',
      controller,
    });

    return result;
  };

  public static Social = (body: ISocialLoginRequestModel): Promise<IResponse<ILoginResponseModel>> => {
    const result = Connection.POST({
      body,
      action: 'social',
      controller,
    });

    return result;
  };

  public static SendCode = (form: ISendCodeRequestModel): Promise<IResponse<number>> => {
    const result = Connection.POST({
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
    const result = Connection.POST({
      body: form,
      action: 'verify',
      controller,
    });

    return result;
  };

  public static Recovery = (form: IRecoveryRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body: form,
      action: 'recovery',
      controller,
    });

    return result;
  };
};

export default AuthController;