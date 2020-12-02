import { IFile } from 'platform/constants/interfaces';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';

export interface IProductListResponseModel {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  isFavorite: boolean;
  discount?: number;
  imagePath?: string;
  unitName: string;
  unitQuantity: number;
};

export interface IProductDetailsResponseModel {
  id: number;
  title: string;
  isFavorite: boolean;
  basketCount: number;
  packagePrice: number;
  description: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  unitName: string;
  discountedPackagePrice: number;
  unitQuantity: number;
  havePackage: boolean;
  images: IFile[];
  category: IProductDetailsCategoryResponseModel;
  brand: IProductDetailsCategoryResponseModel;
  activeIngredients: IProductDetailsActiveIngredientResponseModel[];
}

export interface IProductDetailsCategoryResponseModel {
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