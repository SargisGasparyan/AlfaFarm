export interface IUserAddressListResponseModel {
  id: number;
  name: string;
  cityName: string;
  regionName: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
};

export interface IUserAddressDetailsResponseModel {
  id: number;
  name: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
};
