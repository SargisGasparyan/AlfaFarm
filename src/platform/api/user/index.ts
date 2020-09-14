import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IRegisterRequestModel, IUserModifyRequestModel, IUserPasswordModifyRequestModel } from './models/request';
import { IUserResponseModel } from './models/response';

class UserController {

  private static controller = 'user';

  public static Get = (): Promise<IResponse<IUserResponseModel>> => {
    const result = Connection.GET({
      action: '',
      controller: UserController.controller,
    });

    return result;
  };

  public static Update = (body: IUserModifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IUserModifyRequestModel>({
      body,
      action: '',
      controller: UserController.controller,
    });

    return result;
  };

  public static UploadCover = (body: FormData): Promise<IResponse<boolean>> => {
    const result = Connection.POST<FormData>({
      body,
      action: 'cover',
      controller: UserController.controller,
      noneJSONBody: true,
    });

    return result;
  };

  public static Register = (body: IRegisterRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IRegisterRequestModel>({
      body,
      action: 'register',
      controller: UserController.controller,
    });

    return result;
  };

  public static ChangePassword = (body: IUserPasswordModifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IUserPasswordModifyRequestModel>({
      body,
      action: 'password',
      controller: UserController.controller,
    });

    return result;
  };
};

export default UserController;