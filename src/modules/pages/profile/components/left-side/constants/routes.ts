import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import environment from 'platform/services/environment';

export const leftSideOptions = () => !environment.WHOLESALE ? [
  {
    name: Settings.translations.bonus_card,
    path: ROUTES.PROFILE.BONUS_CARD,
    className: 'P-icon-bonus_card',
  },
  {
    name: Settings.translations.orders,
    path: ROUTES.PROFILE.ORDERS.MAIN,
    className: 'P-icon-orders',
  },
  {
    name: Settings.translations.favorites,
    path: ROUTES.PROFILE.FAVORITES.MAIN,
    className: 'P-icon-favorites',
  },
  {
    name: Settings.translations.special_products,
    path: ROUTES.PROFILE.SPECIAL_PRODUCTS,
    className: 'P-icon-special_products',
  },
  {
    name: Settings.translations.my_registrations,
    path: ROUTES.PROFILE.MY_REGISTRATIONS.MAIN,
    className: 'P-icon-my_registrations',
  },
  {
    name: Settings.translations.addresses,
    path: ROUTES.PROFILE.ADDRESSES.MAIN,
    className: 'P-icon-addresses',
  },
  {
    name: Settings.translations.my_wallet,
    path: ROUTES.PROFILE.MY_WALLET,
    className: 'P-icon-my_wallet',
  },
] : [
  {
    name: Settings.translations.orders,
    path: ROUTES.PROFILE.ORDERS.MAIN,
    className: 'P-icon-orders',
  },
  {
    name: Settings.translations.favorites,
    path: ROUTES.PROFILE.FAVORITES,
    className: 'P-icon-favorites',
  },
];
