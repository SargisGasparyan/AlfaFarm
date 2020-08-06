import { IPriceCounterData } from '../../../constants/interfaces';
// import Storage from 'platform/services/storage';

export const maxBonus = (priceData: IPriceCounterData) => {
  const bonus = (priceData.subtotal - priceData.discount) * .1; //* 10% of Product Price without bonus and promo
  
  // if (bonus > Storage.profile.points) return Storage.profile.points
  return Math.floor(bonus);
}