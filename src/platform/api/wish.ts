import Connection from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';
import { IUserResponseModel } from './user/models/response';
import { IWishListCartProductItem } from './product';

const controller = 'wish';

export interface IWishListGuestRequestModel {
  idList: string[];
};

export interface IWishListGuestResponseModel {
  deletedIdList: string[];
  itemList: IWishListCartProductItem[];
};

export interface IWishListItem {
  _id: string;
  name: string;
};

export interface IWishListRequestedProduct extends IWishListCartProductItem {
  members: IUserResponseModel[];
};

export interface IModifyWishListRequestModel {
  id?: string;
  name: string;
  companyId?: string;
};

export interface IWishListDeleteMemberRequestModel {
  wishListId: string;
  memberIdList: string[];
};

export interface IWishListDetails {
  _id: string;
  company?: string;
  companyId?: string;
  creator: IUserResponseModel;
  members: IUserResponseModel[];
  name: string;
  owner: boolean;
};

export enum ProductWishListActionEnum {
  Add = 1,
  Delete,
};

export interface IChangeProductWishList {
  productId: string;
  productVersionId?: string;
  actions: Array<{
    wishListId: string;
    action: ProductWishListActionEnum
  }>;
};

export interface IWishListShortRequestModel {
  productId: string;
  productVersionId?: string;
};

export interface IWishListProductListRequestModel {
  id: string;
  skip: number;
  limit: number;
  memberIdList?: string[];
};

export interface IWishListDeleteProductRequestModel {
  wishListId: string;
  wishProductId: number;
};

export interface IWishListRequestRequestModel {
  id: string;
  skip: number;
  limit: number;
  memberIdList?: string[];
};

export interface IWishListApproveCancelRequestModel {
  wishListId: string;
  productId: string;
};

export interface IWishListProductCountRequestModel {
  wishListId: string;
  productId: string;
  sum: number;
};

export interface IWishListInviteRequestModel { id: string; };

export interface IWishListJoinRequestModel { code: string; };

export interface IWishListShortItem extends IWishListItem { added: boolean; };

class WishController {

  public static List = (): Promise<IResponse<IWishListItem[]>> => {
    const result = Connection.GET({
      action: 'shortWeb',
      controller,
    });

    return result;
  };

  public static Requested = (body: IWishListRequestRequestModel): Promise<IResponse<IPagination<IWishListRequestedProduct>>> => {
    const result = Connection.POST<IWishListRequestRequestModel>({
      body,
      action: 'product/approve',
      controller,
    });

    return result;
  };

  public static Approve = (body: IWishListApproveCancelRequestModel): Promise<IResponse<IPagination<boolean>>> => {
    const result = Connection.PUT<IWishListApproveCancelRequestModel>({
      body,
      action: 'product/approve',
      controller,
    });

    return result;
  };

  public static Cancel = (body: IWishListApproveCancelRequestModel): Promise<IResponse<IPagination<boolean>>> => {
    const result = Connection.PUT<IWishListApproveCancelRequestModel>({
      body,
      action: 'product/cancel',
      controller,
    });

    return result;
  };

  public static Short = (query: IWishListShortRequestModel): Promise<IResponse<IWishListShortItem[]>> => {
    const result = Connection.GET({
      action: 'short',
      query,
      controller,
    });

    return result;
  };

  public static Details = (id: string): Promise<IResponse<IWishListDetails>> => {
    const result = Connection.GET({
      action: 'details',
      query: { id },
      controller,
    });

    return result;
  };

  public static Add = (body: IModifyWishListRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IModifyWishListRequestModel>({
      body,
      action: '',
      controller,
    });

    return result;
  };

  public static Join = (body: IWishListJoinRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IWishListJoinRequestModel>({
      body,
      action: 'join',
      controller,
    });

    return result;
  };

  public static Invite = (body: IWishListInviteRequestModel): Promise<IResponse<string>> => {
    const result = Connection.POST<IWishListInviteRequestModel>({
      body,
      action: 'invite',
      controller,
    });

    return result;
  };

  public static ProductCount = (body: IWishListProductCountRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IWishListProductCountRequestModel>({
      body,
      action: 'product/count',
      controller,
    });

    return result;
  };


  public static DeleteMember = (body: IWishListDeleteMemberRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE<IWishListDeleteMemberRequestModel>({
      body,
      action: 'member',
      controller,
    });

    return result;
  };

  public static DeleteProduct = (body: IWishListDeleteProductRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE<IWishListDeleteProductRequestModel>({
      body,
      action: 'product',
      controller,
    });

    return result;
  };

  public static Delete = (id: string): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE<object>({
      body: {},
      action: '',
      query: { id },
      controller,
    });

    return result;
  };

  public static Leave = (id: string): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE<object>({
      body: {},
      action: 'leave',
      query: { id },
      controller,
    });

    return result;
  };

  public static Edit = (body: IModifyWishListRequestModel): Promise<IResponse<boolean>> => {
    const result = Connection.PUT<IModifyWishListRequestModel>({
      body,
      action: '',
      controller,
    });

    return result;
  };

  public static Guest = (body: IWishListGuestRequestModel): Promise<IResponse<IWishListGuestResponseModel>> => {
    const result = Connection.POST<IWishListGuestRequestModel>({
      body,
      action: 'guest',
      controller,
    });

    return result;
  };

  public static Product = (body: IChangeProductWishList): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IChangeProductWishList>({
      body,
      action: 'product',
      controller,
    });

    return result;
  };

  public static Products = (body: IWishListProductListRequestModel): Promise<IResponse<IPagination<IWishListCartProductItem>>> => {
    const result = Connection.POST<IWishListProductListRequestModel>({
      body,
      action: 'details/product',
      controller,
    });

    return result;
  };
};

export default WishController;