import { IFile } from 'platform/constants/interfaces';

export interface IFAQListResponseModel {
  id: number;
  title: string;
  description: string;  
};

export interface IBlogDetailsResponseModel {
  id: number;
  images: IFile[];
  title: string;
  shortDescription: string;
  description: string;
  createdDate: string;
};