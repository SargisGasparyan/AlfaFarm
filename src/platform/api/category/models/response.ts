export interface ICategoryListResponseModel {
  id: number;
  name: string;
  productsCount?: number;
  photoPath?: string;
  hasChildren?: boolean;
}