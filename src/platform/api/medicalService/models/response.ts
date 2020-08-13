export interface IMedicalServiceListResponseModel {
  id: number;
  name: string;
  price: number;
}

export interface IMedicalServicePriceListResponseModel {
  id: number;
  name: string;
  services: IMedicalServiceListResponseModel[];
}