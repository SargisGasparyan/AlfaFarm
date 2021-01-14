import { BannerTypeEnum } from '../constants/enums';

export interface IBannerListResponseModel {
  id: number;
  type: BannerTypeEnum;
  dataId: number;
  title: string;
  description: string;
  photoPath: string;
};