export interface IMedicalServiceListResponseModel {
  id: number;
  name: string;
  price: number;
  duration: number;
};

export interface IMedicalServicePriceListResponseModel {
  id: number;
  name: string;
  services: IMedicalServiceListResponseModel[];
};