import { GenderEnum } from '../constants/enums/gender';

export interface IUserResponseModel {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  photoPath: string;
  dateOfBirth: string;
  gender: GenderEnum;
};
