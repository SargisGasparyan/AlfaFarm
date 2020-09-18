import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import enviroment from 'platform/services/enviroment';

export const leftSideOptions = () => !enviroment.WHOLESALE ? [
  {
    name: Settings.translations.bonus_card,
    path: ROUTES.PROFILE.BONUS_CARD,
  },
  {
    name: Settings.translations.orders,
    path: ROUTES.PROFILE.ORDERS.MAIN,
  },
  {
    name: Settings.translations.favorites,
    path: ROUTES.PROFILE.FAVORITES,
  },
  {
    name: Settings.translations.special_products,
    path: ROUTES.PROFILE.SPECIAL_PRODUCTS,
  },
  {
    name: Settings.translations.my_registrations,
    path: ROUTES.PROFILE.MY_REGISTRATIONS.MAIN,
  },
  {
    name: Settings.translations.addresses,
    path: ROUTES.PROFILE.ADDRESSES.MAIN,
  },
  {
    name: Settings.translations.my_wallet,
    path: ROUTES.PROFILE.MY_WALLET,
  },
] : [
  {
    name: Settings.translations.orders,
    path: ROUTES.PROFILE.ORDERS.MAIN,
  },
  {
    name: Settings.translations.favorites,
    path: ROUTES.PROFILE.FAVORITES,
  },
];