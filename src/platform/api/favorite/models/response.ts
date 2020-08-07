export interface IFavoriteListResponseModel {
  id: number;
  title: string;
  price: number;
  isFavorite: boolean;
  discount?: number;
  imagePath?: string;
  unitName: string;
  unitQuantity: number;
};
