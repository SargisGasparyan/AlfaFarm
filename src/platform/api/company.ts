import Connection    from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';
import { IAddress, IAddressRequestModel } from './address';

const controller = 'company';

export interface IDeliveryAddress {
  address: string;
  lat?: number;
  lng?: number;
  house?: number;
  apartment?: string;
  contactName: string;
  contactPhoneNumber: string;
};

export interface ICompanyRequestModel {
  id?: string;
  name: string;
  tin: string;
  bilAddress: string;
  bilLat?: number;
  bilLng?: number;
  bilHouse?: number;
  bilApartment?: string;
  delAddresses: IDeliveryAddress[];
};

export interface ICompany {
  _id: string;
  address: string;
  lat: number;
  lng: number;
  name: string;
  tin: string;
  deliveryAddresses: IDeliveryAddress[];
  billingAddress: {
    address: string;
    lat?: number;
    lng?: number;
    house?: number;
    apartment?: string;
  };
};


export interface ICompanyShort {
  _id: string;
  name: string;
};

class CompanyController {

  public static List = (pageNo: number, limit: number): Promise<IResponse<IPagination<ICompany>>> => {
    const result = Connection.GET({
      action: 'list',
      query: { pageNo, limit },
      controller,
    });

    return result;
  };

  public static Short = (): Promise<IResponse<ICompanyShort[]>> => {
    const result = Connection.GET({
      action: 'short',
      controller,
    });

    return result;
  };

  public static Details = (id: string): Promise<IResponse<ICompany>> => {
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

  public static Add = (form: ICompanyRequestModel): Promise<IResponse<string>> => {
    const result = Connection.POST<ICompanyRequestModel>({
      body: form,
      action: '',
      controller,
    });

    return result;
  };

  public static Delivery = (id: string): Promise<IResponse<IAddress[]>> => {
    const result = Connection.GET({
      action: 'delivery',
      query: { id },
      controller,
    });

    return result;
  };

  public static AddDelivery = (body: IAddressRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IAddressRequestModel>({
      action: 'delivery',
      controller,
      body,
    });

    return result;
  };

  public static Edit = (form: ICompanyRequestModel): Promise<IResponse<string>> => {
    const result = Connection.PUT<ICompanyRequestModel>({
      body: form,
      action: '',
      controller,
    });

    return result;
  };
};

export default CompanyController;