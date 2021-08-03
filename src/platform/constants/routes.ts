import RouteService from '../services/routes';
import Settings from "../services/settings";
import {Home} from "../../modules/pages";
import { LanguageEnum } from '../../platform/constants/enums';


const PROFILE_ROUTES = (() => {
  const ADDRESSES_ROUTES = RouteService.buildRouteContext('/profile/addresses', {
    MAIN: '',
    CREATE: '/create',
    UPDATE: '/update/:id',
  });

  const ORDERS_ROUTES = RouteService.buildRouteContext('/profile/orders', {
    MAIN: '',
    DETAILS: '/details/:id',
  });

  const FAVORITES_ROUTES = RouteService.buildRouteContext('/profile/favorites', {
    MAIN: '',
    SAVED_BASKET_ITEMS: '/saved-basket-items/:id',
    SAVED_BASKET: '/saved-baskets',
  });

  const PRESCRIPTIONS_ROUTES = RouteService.buildRouteContext('/profile/prescriptions', {
    MAIN: '',
    CREATE: '/create',
    DECIPHERED: '/deciphered/:id',
  });

  const MY_REGISTRATIONS_ROUTES = RouteService.buildRouteContext('/my-registrations', {
    MAIN: '',
    MEDICAL_HISTORY: '/medical-history',
  });

  return RouteService.buildRouteContext("/profile", {
    MAIN: '',
    ORDERS: ORDERS_ROUTES,
    ADDRESSES: ADDRESSES_ROUTES,
    SPECIAL_PRODUCTS: '/special-products',
    BONUS_CARD: '/bonus-card',
    MY_ORDERS: '/my-orders',
    MY_COMPANY: '/my-company',
    MY_REQUESTS: '/my-requests',
    MY_ADDRESSES: '/my-addresses',
    MY_WALLET: '/my-wallet',
    NOTIFICATIONS: "/notifications",

    FAVORITES: FAVORITES_ROUTES,
    PRESCRIPTIONS: PRESCRIPTIONS_ROUTES,
    MY_REGISTRATIONS: MY_REGISTRATIONS_ROUTES,
  });
})();
const BLOG_ROUTES = RouteService.buildRouteContext(`${window.localStorage.getItem('language') as LanguageEnum || Settings.defaultLanguage}/blogs`, {
  MAIN: '',
  DETAILS: `/:id`,
});

const NEWS_ROUTES = RouteService.buildRouteContext('/news', {
  MAIN: '',
  DETAILS: '/:id',
});

const TENDERS_ROUTES = RouteService.buildRouteContext('/tenders', {
  MAIN: '',
  DETAILS: '/:id',
});

const CLINIC_ROUTES = RouteService.buildRouteContext('/clinic', {
  MAIN: '',
  DOCTORS: '/doctors',
  LABORATORY: '/laboratory',
  PRICE_LIST: '/price-list',
  ABOUT_US: '/about-us',
});

const PRODUCTS_ROUTES = RouteService.buildRouteContext('/products', {
  MAIN: '',
  SIMILAR: '/similar/:id',
  DETAILS: '/details/:id',
});

const WISH_LIST_ROUTES = RouteService.buildRouteContext('/wish-list', {
  MAIN: '',
  INVITATION: '/invitation/:code',
});

const ROUTES = {
  HOME: ``,
  FAQ: '/faq',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ABOUT_US: '/about-us',
  VACANCIES: '/vacancies',
  HOW_TO_ORDER_ONLINE: '/how-to-order-online',
  CONTACT: '/contact',
  BUSINESS: '/business',
  CONTRACT: '/contract',
  SERVICES: '/services',
  CLINIC: CLINIC_ROUTES,
  PHARMACIES: '/pharmacies',
  CARD_INFO: '/card-info',
  EXCHANGE_RETURN: '/exchange-return',
  WHOLESALE_NEWS: '/wholesale-news',
  WHOLESALE_PROMOTIONS: '/wholesale-promotions',
  CONFIDENTIALITY_CONDITIONS: '/conditions',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',

  BLOG: BLOG_ROUTES,
  NEWS: NEWS_ROUTES,
  TENDERS: TENDERS_ROUTES,
  PROFILE: PROFILE_ROUTES,
  PRODUCTS: PRODUCTS_ROUTES,
  WISH_LIST: WISH_LIST_ROUTES,
}

export default ROUTES;
