import { IFile } from 'platform/constants/interfaces';

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
  description: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  unitName: string;
  unitQuantity: number;
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