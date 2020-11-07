export interface IUserAddressListResponseModel {
  id: number;
  isDefault: boolean;
  name: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
  building?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  comment?: string;
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
