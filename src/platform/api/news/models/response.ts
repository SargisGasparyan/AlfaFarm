import { IFile } from 'platform/constants/interfaces';

export interface INewsListResponseModel {
  id: number;
  imagePath: string;
  title: string;
  shortDescription: string;
  createdDate: string;
};

export interface INewsDetailsResponseModel {
  id: number;
  images: IFile[];
  title: string;
  shortDescription: string;
  description: string;
  createdDate: string;
};