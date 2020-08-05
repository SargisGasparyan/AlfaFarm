import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';

export const leftSideOptions = () => [
  {
    name: Settings.translations.favorites,
    path: ROUTES.PROFILE.FAVORITES,
  },
  {
    name: Settings.translations.orders,
    path: ROUTES.PROFILE.ORDERS.MAIN,
  },
  {
    name: Settings.translations.addresses,
    path: ROUTES.PROFILE.ADDRESSES.MAIN,
  },
  {
    name: Settings.translations.my_registrations,
    path: ROUTES.PROFILE.MY_REGISTRATIONS,
  },
];