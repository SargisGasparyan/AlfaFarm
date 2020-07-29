export interface ICityListResponseModel {
  id: number;
  name: string;
};

export interface IRegionListResponseModel {
  id: number;
  name: string;
  city?: ICityListResponseModel;
};