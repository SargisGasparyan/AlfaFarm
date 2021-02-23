export interface IUserAddressModifyRequestModel {
  name: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
  building?: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
}