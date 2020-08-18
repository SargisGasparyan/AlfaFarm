import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IRegisterRequestModel, IUserModifyRequestModel } from './models/request';
import { IUserResponseModel } from './models/response';

const controller = 'user';
export enum ProfileTariffPlanEnum {
  Usual = 1,
  Silver,
  Gold,
};

export interface IUserEditRequestModal {
  firstName: string;
  lastName: string;
  email: string;

};

export interface IUserEditPhoneRequestModal {
  phoneNumber?: string;
};

export interface IUserVerifyPhoneRequestModal {
  phoneNumber: string;
  code: string;
};


class UserController {

  private static controller = 'user';

  public static Get = (): Promise<IResponse<IUserResponseModel>> => {
    const result = Connection.GET({
      action: '',
      controller,
    });

    return result;
  };

  public static Update = (body: IUserModifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IUserModifyRequestModel>({
      body,
      action: '',
      controller,
    });

    return result;
  };

  public static UploadCover = (body: FormData): Promise<IResponse<boolean>> => {
    const result = Connection.POST<FormData>({
      body,
      action: 'cover',
      controller,
      noneJSONBody: true,
    });

    return result;
  };

  public static Register = (body: IRegisterRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body,
      action: 'register',
      controller: UserController.controller,
    });

    return result;
  };

  public static Edit = (body: IUserEditRequestModal): Promise<IResponse<string>> => {
    const result = Connection.PUT<IUserEditRequestModal>({
      body,
      action: '',
      controller,
    });

    return result;
  };

  public static EditPhone = (body: IUserEditPhoneRequestModal): Promise<IResponse<null>> => {
    const result = Connection.PUT<IUserEditPhoneRequestModal>({
      body,
      action: '/phone',
      controller,
    });

    return result;
  };

  public static VerifyPhone = (body: IUserVerifyPhoneRequestModal): Promise<IResponse<number>> => {
    const result = Connection.POST<IUserVerifyPhoneRequestModal>({
      body,
      action: '/verifyPhone',
      controller,
    });

    return result;
  };
};

export default UserController;