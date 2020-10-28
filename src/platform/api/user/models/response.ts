import { GenderEnum } from '../constants/enums/gender';

export interface IUserResponseModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  photoPath: string;
  dateOfBirth: string;
  gender: GenderEnum;
};


export interface IPreferredProductListResponseModel {
  id: number;
  title: string;
  price: number;
  expiredDate: string;
  isFavorite: boolean;
  discount?: number;
  imagePath?: string;
  unitName: string;
  unitQuantity: number;
};