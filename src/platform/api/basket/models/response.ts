export interface IBasketResponseModel {
  totalPrice: number;
  bonus: number;
  items: IBasketListResponseModel[];
};

export interface IBasketListResponseModel {
  id: number;
  productId: number;
  productPhoto: string;
  price: number;
  unitName: string;
  unitQuantity: number;
  productTitle: string;
  productQuantity: number;
  isPackage: boolean,
};

export interface ISavedBasketListResponseModel {
  id: number;
  itemsCount: number;
};

export interface IBasketChangeResponseModel {
  bonus: number;
  totalPrice: number;
};
