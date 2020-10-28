import { IFile } from 'platform/constants/interfaces';

export interface ITenderListResponseModel {
  id: number;
  title: string;
  shortDescription: string;
  endDate: string;
  imagePath: string;
};

export interface ITenderDetailsResponseModel {
  id: number;
  imagePath: string;
  relatedFiles: IFile[];
  title: string;
  shortDescription: string;
  description: string;
  createdDate: string;
  endDate: string;
};