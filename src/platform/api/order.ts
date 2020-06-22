import Connection from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';
import Settings from '../services/settings';
import { IProductListItem, ICartItem, IProductCartListResponseModel } from './product';
import { IProfile } from './user';
import { IAddress } from './address';

const controller = 'order';

export enum OrderPaymentMethodEnum {
  Cash = 1,
  Idram = 2,
  BankTransfer,
  Card,
};

export enum OrderTypeEnum {
  Active = 1,
  Completed,
};

export enum OrderStatusEnum {
  Draft = 1,
  Pending,
  Finished,
  Canceled,
};

export enum OrderDeliveryTypeEnum {
  Delivery = 1,
  PickUp,
};

export interface IOrderRequestModel {
  email?: string;
  phoneNumber?: string;
  guestName?: string;
  guestPhoneNumber?: string;
  additional: string;
  deliveryMethod: OrderDeliveryTypeEnum;
  deliveryAddressId?: string;
  paymentMethod: OrderPaymentMethodEnum;
  companyId?: string;
  code?: string;
  deliveryDate?: string;
  bonus?: number;
  promoCode?: string;
  idList: ICartItem[];
};

export interface IOrder extends IProfile {
  _id: string;
  nid: number;
  deliveryDate: string;
  sender: string;
  total: number;
  productCount: number;
  products: IProductListItem[];
  status: OrderStatusEnum;
};

export interface IOrderCartRequestModel { id: string; };

export interface IOrderDetailsItem {
  _id: string;
  nid: string;
  payer: string;
  billingAddress?: string;
  deliveryAddress?: IAddress;
  deliveryType: OrderDeliveryTypeEnum;
  active: boolean;
  deliveryDate: string;
  paymentMethod: OrderPaymentMethodEnum;
  receivingBonuses?: number;
  count?: number;
  products: IProductListItem[];
  status: OrderStatusEnum;
  comment?: string;
  total: number;
  subTotal: number;
  deliveryFee: number;
  points: number;
  discount: number;
};

export interface IOrderCheckoutResponseModel {
  deliveryFee: number;
  billingAddress?: string;
  deliveryAddress?: IAddress;
  companyId?: string;
  dayCount: number;
};

export interface IAddFilesResponseModel { _id: string; };

export interface IPayer {
  companyId: string;
  companyName: string;
  deliveryAddress: IAddress;
  billingAddress?: IAddress;
};

export interface IOrderEmailRequestModel { email: string; };
export interface IOrderphoneNumberRequestModel {
   phoneNumber: string;
   email: string;
  };

export interface IOrderEmailVerifyRequestModel {
  email: string;
  code: string;
};

export interface IOrderPhoneNumberVerifyRequestModel {
  phoneNumber: string;
  code: string;
};

export interface IOrderPhoneNumberVerifyRequestModel {
  phoneNumber: string;
  code: string;
};

export interface IOrderGuestRequestModel { 
  email: string;
  code: string;
};

export interface IOrderCancelRequestModel {
  id: string;
  reason: string;
};

export interface IOrderCheckoutRequestModel {
  wishListId?: string;
  idList: ICartItem[];
  bonus?: number;
};

export interface IOrderDeliveryRequestModel {
  id: string;
  price: number;
};

export interface IOrderPromoRequestModel {
  email?: string;
  deliveryType: OrderDeliveryTypeEnum;
  code: string;
  price: number;
  addressId?: string;
};

export interface IOrderPromoResponseModel {
  deliveryFee: number;
  discountAmount: number;
  isFreeShipping: boolean;
};

export interface IOrderInvoiceRequestModel {
  idList: ICartItem[];
  companyId: string | null;
};

export interface IOrderRepeatRequestModel { id: string; };

class OrderController {

  public static List = (pageNo: number, limit: number, active: boolean): Promise<IResponse<IPagination<IOrder>>> => {
    const result = Connection.GET({
      action: 'list',
      query: { language: Settings.language, pageNo, limit, active },
      controller,
    });

    return result;
  };

  public static Payer = (): Promise<IResponse<IPayer[]>> => {
    const result = Connection.GET({
      action: 'payer',
      controller,
    });

    return result;
  };

  public static Invoice = (body: IOrderInvoiceRequestModel): Promise<IResponse<string>> => {
    const result = Connection.POST<IOrderInvoiceRequestModel>({
      body,
      action: 'invoice',
      controller,
    });

    return result;
  };

  public static Create = (body: IOrderRequestModel): Promise<IResponse<any>> => {
    const result = Connection.POST<IOrderRequestModel>({
      body,
      action: '',
      controller,
    });

    return result;
  };

  public static Cancel = (body: IOrderCancelRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IOrderCancelRequestModel>({
      body,
      action: 'cancel',
      controller,
    });

    return result;
  };

  public static Repeat = (body: IOrderRepeatRequestModel): Promise<IResponse<IProductCartListResponseModel>> => {
    const result = Connection.POST<IOrderRepeatRequestModel>({
      body,
      action: 'repeat',
      controller,
    });

    return result;
  };

  public static Promo = (body: IOrderPromoRequestModel): Promise<IResponse<IOrderPromoResponseModel>> => {
    const result = Connection.POST<IOrderPromoRequestModel>({
      body,
      action: 'promo',
      controller,
    });

    return result;
  };

  public static Email = (body: IOrderEmailRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IOrderEmailRequestModel>({
      body,
      action: 'email/send',
      controller,
    });

    return result;
  };

  public static PhoneNumber = (body: IOrderphoneNumberRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IOrderphoneNumberRequestModel>({
      body,
      action: 'phoneNumber/send',
      controller,
    });

    return result;
  };

  public static EmailVerify = (body: IOrderEmailVerifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IOrderEmailVerifyRequestModel>({
      body,
      action: 'email/verify',
      controller,
      dataAsSuccess: true,
    });

    return result;
  };

  public static PhoneNumberVerify = (body: IOrderPhoneNumberVerifyRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IOrderPhoneNumberVerifyRequestModel>({
      body,
      action: 'phoneNumber/verify',
      controller,
      dataAsSuccess: true,
    });

    return result;
  };

  public static Guest = (body: IOrderGuestRequestModel): Promise<IResponse<string | null>> => {
    const result = Connection.POST<IOrderGuestRequestModel>({
      body,
      action: 'guest',
      controller,
    });

    return result;
  };

  public static Details = (id: string): Promise<IResponse<IOrderDetailsItem>> => {
    const result = Connection.GET({
      action: 'dtlsUser',
      query: { id, language: Settings.language },
      controller,
    });

    return result;
  };

  public static Checkout = (body: IOrderCheckoutRequestModel): Promise<IResponse<IOrderCheckoutResponseModel>> => {
    const result = Connection.POST<IOrderCheckoutRequestModel>({
      action: 'checkout',
      controller,
      body,
    });

    return result;
  };

  public static Delivery = (body: IOrderDeliveryRequestModel): Promise<IResponse<number>> => {
    const result = Connection.POST<IOrderDeliveryRequestModel>({
      action: 'delivery',
      controller,
      body,
    });

    return result;
  };
};

export default OrderController;