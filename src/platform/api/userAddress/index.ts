import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IUserAddressListResponseModel, IUserAddressDetailsResponseModel } from './models/response';
import { IUserAddressModifyRequestModel } from './models/request';

class UserAddressController {

  private static controller = 'userAddress';

  public static GetList = (): Promise<IResponse<IUserAddressListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: UserAddressController.controller,
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<IUserAddressDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: UserAddressController.controller,
    });

    return result;
  };

  public static Create = (body: IUserAddressModifyRequestModel): Promise<IResponse<number>> => {
    const result = Connection.POST<IUserAddressModifyRequestModel>({
      body,
      action: '',
      controller: UserAddressController.controller,
    });

    return result;
  };

  public static Update = (id: number, body: IUserAddressModifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IUserAddressModifyRequestModel>({
      body,
      action: `${id}`,
      controller: UserAddressController.controller,
    });

    return result;
  };

  public static Delete = (id: number): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE<{}>({
      body: {},
      action: `${id}`,
      controller: UserAddressController.controller,
    });

    return result;
  };
};

export default UserAddressController;