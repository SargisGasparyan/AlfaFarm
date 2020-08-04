import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';

export const leftSideOptions = () => [
  {
    name: Settings.translations.favorites,
    path: ROUTES.PROFILE.FAVORITES,
  },
  {
    name: Settings.translations.orders,
    path: ROUTES.PROFILE.ORDERS,
  },
];