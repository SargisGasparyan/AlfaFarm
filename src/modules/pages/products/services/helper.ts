import Storage from 'platform/services/storage';
import { IProductPricingAmount } from 'platform/api/product';
import { ProfileTariffPlanEnum } from 'platform/api/user';

export const getAmountByCount = (count: number, priceAmounts: IProductPricingAmount[], checkTariff?: boolean) => {
  const tariffPlan = null;
  // if (checkTariff && Storage.profile) tariffPlan = Storage.profile.tariffPlan;

  if (priceAmounts.length) {
    const sorted = priceAmounts.sort((first, second) => second.fromCount - first.fromCount);
    if (tariffPlan === ProfileTariffPlanEnum.Gold) return sorted[0];

    for (let index = 0; index < sorted.length; index++) {
      const item = sorted[index];
      if (+count >= item.fromCount) {
        if (tariffPlan === ProfileTariffPlanEnum.Silver) return !index ? item : sorted[index - 1];
        return item;
      }
    }
  }

  return null;
};