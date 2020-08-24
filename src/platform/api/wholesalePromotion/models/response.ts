export interface IWholesalePromotionBrandListResponseModel {
  brandId: number;
  brandName: string;
  brandPhoto: string;
  promotions: IWholesalePromotionListResponseModel[];
};

export interface IWholesalePromotionListResponseModel {
  id: number;
  productId: number;
  productTitle: string;
  fromCount: number;
  giftCount: number;
};