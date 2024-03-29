import { IFile } from 'platform/constants/interfaces';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';
import { ICategoryListResponseModel } from 'platform/api/category/models/response';
import { PromotionTypeEnum } from 'platform/constants/enums';

export interface IProductListResponseModel {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  isFavorite: boolean;
  discount?: number;
  imagePath: string;
  promotion: IPromotionModel;
  unitName: string;
  unitQuantity: number;
  productId: number;
  productName: string;
};

export interface IProductSearcResponseModel {
  products: IProductSearchProductResponseModel[];
  categories: ICategoryListResponseModel[];
};

export interface IProductSearchProductResponseModel {
  id: number;
  title: string;
  price: number;
  promotion: IPromotionModel;
  imagePath: string;
  cartLoading?: boolean;
  producer: IProductDetailsProducerResponseModel;
}

export interface IProductDetailsResponseModel {
  id: number;
  title: string;
  isFavorite: boolean;
  isSpecial: boolean;
  basketCount: number;
  packagePrice: number;
  description: string;
  price: number;
  stockQuantity: boolean;
  discountedPrice?: number;
  discount?: number;
  promotion: IPromotionModel;
  packagePromotion: IPromotionModel;
  unitName: string;
  discountedPackagePrice: number;
  unitQuantity: number;
  havePackage: boolean;
  images: IFile[];
  category: IProductDetailsCategoryResponseModel;
  producer: IProductDetailsProducerResponseModel;
  brand: IProductDetailsBrandResponseModel;
  activeIngredients: IProductDetailsActiveIngredientResponseModel[];
}

export interface IPromotionModel {
  availablePromotions: IPromotionAvailablePromotionsModel;
  groupPromotion: IPromotionGroupPromotionModel;
  percent: number;
  promotionType: number;
  result: number;
}

export interface IPromotionGroupPromotionModel {
  count: number;
  percent: number;
  promotionType: PromotionTypeEnum;
  result: number;
};

export interface IPromotionAvailablePromotionsModel {
  groupProductPromotions: IPromotionGroupProductPromotionModel[];
}

export interface IPromotionGroupProductPromotionModel {
  boundleId: number;
  isLocked: boolean;
  totalBonus: number;
  products: IPromotionProductModel[];
}

export interface IPromotionProductModel {
  bonus: number;
  imagePath: string;
  isPackage: boolean;
  percent: number;
  productId: number;
  productTitle: string;
  quantity: number;
}

export interface IProductDetailsCategoryResponseModel {
  id: number;
  name: string;
};

export interface IProductDetailsProducerResponseModel {
  id: number;
  name: string;
};

export interface IProductDetailsBrandResponseModel {
  id: number;
  name: string;
};

export interface IProductDetailsActiveIngredientResponseModel {
  id: number;
  name: string;
};

export interface IProductPriceRangeResponseModel {
  min: number;
  max: number;
};

export interface IProductAvailablityResponseModel {
  branches: IPharmacyBranchListResponseModel[];
};
