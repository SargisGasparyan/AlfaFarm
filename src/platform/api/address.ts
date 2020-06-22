import Connection    from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';

const controller = 'address';

export interface IAddressRequestModel {
  id?: string;
  address: string;
  lat?: number;
  lng?: number;
  house?: string;
  apartment?: string;
  contactName: string;
  contactPhoneNumber: string;
  isDefault: boolean;
};

export interface IAddress {
  _id: string;
  address: string;
  lat: number;
  lng: number;
  apartment?: string;
  house?: string;
  contactName: string;
  contactPhoneNumber: string;
  isUserDefaultAddress: boolean;
};

class AddressController {

  public static List = (pageNo: number, limit: number): Promise<IResponse<IPagination<IAddress>>> => {
    const result = Connection.GET({
      action: 'list',
      query: { pageNo, limit },
      controller,
    });

    return result;
  };

  public static All = (): Promise<IResponse<IAddress[]>> => {
    const result = Connection.GET({
      action: 'all',
      controller,
    });

    return result;
  };

  public static Details = (id: string): Promise<IResponse<IAddress>> => {
    const result = Connection.GET({
      action: '',
      query: { id },
      controller,
    });

    return result;
  };

  public static Delete = (id: string): Promise<IResponse<string>> => {
    const result = Connection.DELETE<object>({
      body: {},
      action: '',
      query: { id },
      controller,
    });

    return result;
  };

  public static Add = (form: IAddressRequestModel): Promise<IResponse<string>> => {
    const result = Connection.POST<IAddressRequestModel>({
      body: form,
      action: '',
      controller,
    });

    return result;
  };

  public static Edit = (form: IAddressRequestModel): Promise<IResponse<string>> => {
    const result = Connection.PUT<IAddressRequestModel>({
      body: form,
      action: '',
      controller,
    });

    return result;
  };
};

export default AddressController;