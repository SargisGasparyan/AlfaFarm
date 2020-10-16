export interface IUserAddressListResponseModel {
  id: number;
  name: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
};

export interface IUserAddressDetailsResponseModel {
  id: number;
  name: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
  building?: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  comment?: string;
};
