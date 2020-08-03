import Connection from '../../services/connection';
import { IResponse, IPagination } from '../../constants/interfaces';
import { IProductListRequestModel } from './models/request';
import { IProductListResponseModel, IProductDetailsResponseModel } from './models/response';

export enum ProductColorTypeEnum {
  MultiColor = 1,
  OneColor,
  TwoColor,
};

export enum ProductAttributeTypeEnum {
  Usual = 1,
  Color,
};

export interface IProductImage {
  _id: string;
  path: string;
};

export interface IProductFeature {
  _id: string;
  title: string;
  description: string;
};

export interface IProductPricing {
  bonus: number | null;
  discount: number | null;
  fromCount: number;
};

export interface IProductPricingAmount extends IProduct {
  fromCount: number;
};

export interface IProductAttribute {
  _id: string;
  name: string;
  options: IProductAttributeOption[],
  type: ProductAttributeTypeEnum;
};

export interface IProductAttributeOption {
  _id: string;
  name: string;
  colorType: ProductColorTypeEnum,
  firstColor: string | null,
  secondColor: string | null,
  disabled?: boolean;
};

export interface IProductChosenAttribute {
  attribute: string;
  option: string;
  displayName?: string;
};

export interface IProduct {
  _id: string;
  name: string;
  photo?: string;
  isFavorite: boolean;
  description: string;
  step: number;
  minCount: number;
  price: number | null;
  discountedMaxPrice: number | null;
  discountedMinPrice: number | null;
  maxPrice: number;
  minPrice: number;
  discount: number;
  bonusAmount: number;
  discountedPrice: number;
  images: IProductImage[];
  features: IProductFeature[];
  pricing: IProductPricing[];
  priceAmounts: IProductPricingAmount[];
  brand: string;
  brandId: string;
  minBonusAmount: number;
  maxBonusAmount: number;
  bonus: number;
  preparingDayCount: number;
  attributes?: { [key: string]: IProductAttribute; };
  metaKeywords: { 
    keywords?: string;
    title?: string;
    description?: string;
   };
};

export interface IProductListItem {
  _id: string;
  attributes: IProductListItemAttribute[];
  productId: string;
  productVersionId: string;
  name: string;
  navigate: boolean;
  count: number;
  bonus: number | null;
  bonusAmount: number | null;
  discounted: boolean;
  sameDiscount: boolean;
  defaultPrice: number;
  discount: number | null;
  discountedPrice: number | null;
  price: number | null;
  maxDiscount: number | null;
  maxBonus: number | null;
  minBonus: number | null;
  maxDiscountedPrice: number | null;
  minDiscountedPrice: number | null;
  maxPrice: number | null;
  minPrice: number | null;
  hasVersions: number;
  imagePath: string;
  image: string;
  preparingDayCount: number | null;
};

export interface IProductVersionRequestModel {
  id: string;
  chosen: IProductChosenAttribute[];
};

export interface IProductVersionResponseModel {
  attributes: { [key: string]: IProductAttribute; };
  version: {
    _id: string;
    isFavorite: boolean;
    photo: string;
    price: number;
    priceAmounts: IProductPricingAmount[];
  };
};

export interface IProductSearchItem {
  name: string;
  _id: string;
};



export interface IProductCartListRequestModel { idList: ICartItem[]; }

export interface ICartItem {
  product: string;
  productVersion?: string | null;
  count: number;
};

export interface IWishListCartProductItem {
  _id: string;
  defaultPrice: number;
  count: number;
  discountedPrice: number | null;
  filePath: string;
  step: number;
  image: string;
  name: string;
  productId: string;
  minCount: number;
  product: string;
  productVersion?: string;
  versionId: string | null;
  attributes: IProductListItemAttribute[];
  priceList: IProductPricingAmount[];
};

export interface IProductListItemAttribute {
  attributeId: string;
  attributeName: string;
  optionId: string;
  optionName: string;
};

export interface IProductCartListResponseModel {
  deletedList: ICartItem[],
  itemList: IWishListCartProductItem[],
};

export interface IProposalPagination<Data> extends IPagination<Data> {
  _id: string;
  name: string;
};

export interface IProductFilterRange {
  minPrice: number;
  maxPrice: number;
};

export interface IProductPagination<Data> extends IPagination<Data> { range?: IProductFilterRange; };


class ProductController {

  private static controller = 'product';

  public static GetList = (body: IProductListRequestModel): Promise<IResponse<IPagination<IProductListResponseModel>>> => {
    const result = Connection.POST<IProductListRequestModel>({
      body,
      action: 'list',
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetRelated = (id: number): Promise<IResponse<IProductListResponseModel[]>> => {
    const result = Connection.GET({
      action: `related/${id}`,
      controller: ProductController.controller,
    });

    return result;
  };

  public static GetDetails = (id: number): Promise<IResponse<IProductDetailsResponseModel>> => {
    const result = Connection.GET({
      action: `${id}`,
      controller: ProductController.controller,
    });

    return result;
  };

  public static ServerDetails = (id: string): Promise<IResponse<IProduct>> => {
    const result = Connection.ServerRequest({
      method: 'GET',
      action: 'details',
      query: { id },
      controller: ProductController.controller,
    });

    return result;
  };

  public static Similar = (id: string, count: number): Promise<IResponse<IProductListItem[]>> => {
    const result = Connection.GET({
      action: 'similar',
      query: { id, count },
      controller: ProductController.controller,
    });

    return result;
  };

  public static Cart = (body: IProductCartListRequestModel): Promise<IResponse<IProductCartListResponseModel>> => {
    const result = Connection.POST<IProductCartListRequestModel>({
      body,
      action: 'cart',
      controller: ProductController.controller,
    });

    return result;
  };

  public static MainList = (body: IProductListRequestModel): Promise<IResponse<IProductPagination<IProductListItem>>> => {
    const result = Connection.POST<IProductListRequestModel>({
      body,
      action: 'mainList',
      controller: ProductController.controller,
    });

    return result;
  };

  public static Search = (key: string): Promise<IResponse<IProductSearchItem[]>> => {
    const result = Connection.GET({
      action: 'search',
      query: { key },
      controller: ProductController.controller,
    });

    return result;
  };

  public static Proposal = (pageNo: number, limit: number): Promise<IResponse<IProposalPagination<IProductListItem>>> => {
    const result = Connection.GET({
      action: '',
      query: { pageNo, limit },
      controller: 'proposal',
    });

    return result;
  };

  public static Version = (body: IProductVersionRequestModel): Promise<IResponse<IProductVersionResponseModel>> => {
    const result = Connection.POST<IProductVersionRequestModel>({
      body,
      action: 'version',
      controller: ProductController.controller,
    });

    return result;
  };

  public static Range = (body: IProductVersionRequestModel): Promise<IResponse<IProduct>> => {
    const result = Connection.POST<IProductVersionRequestModel>({
      body,
      action: 'range',
      controller: ProductController.controller,
    });

    return result;
  };
};

export default ProductController;