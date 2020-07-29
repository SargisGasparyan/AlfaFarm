import { LanguageEnum } from 'platform/constants/enums';

export interface ILanguageListResponseModel {
  id: number;
  isoCode: LanguageEnum;
  name: string;
};