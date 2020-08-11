import { IFile } from 'platform/constants/interfaces';

export interface IBlogListResponseModel {
  id: number;
  imagePath: string;
  title: string;
  shortDescription: string;
  createdDate: string;
};

export interface IBlogDetailsResponseModel {
  id: number;
  images: IFile[];
  title: string;
  shortDescription: string;
  description: string;
  createdDate: string;
};