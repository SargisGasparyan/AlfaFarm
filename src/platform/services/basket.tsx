import { IBasketListResponseModel } from 'platform/api/basket/models/response';
import { PromotionTypeEnum } from 'platform/constants/enums';

export function getBasketItemPriceInfo(item: IBasketListResponseModel) {
  const result = {
    price: item.productQuantity * (item.isPackage ? item.packagePrice : item.price),
    discountedPrice: 0,
    bonus: 0,
  };

  if (item.promotion.promotionType === PromotionTypeEnum.Discount) {
    result.discountedPrice = item.promotion.groupPromotion ? item.promotion.result - item.promotion.groupPromotion.result : item.promotion.result;
    return result;
  }

  result.bonus = item.promotion.result;
  if (item.promotion.groupPromotion) result.discountedPrice = result.price - item.promotion.groupPromotion.result;

  return result;
};