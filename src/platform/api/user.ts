import Connection from '../services/connection';
import { IResponse } from '../constants/interfaces';

const controller = 'user';

export interface IProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  phoneNumber: string | null;
  tariffPlan: ProfileTariffPlanEnum;
};

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

  public static Details = (): Promise<IResponse<IProfile>> => {
    const result = Connection.GET({
      action: '',
      controller,
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