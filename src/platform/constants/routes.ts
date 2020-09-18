import RouteService from '../services/routes';

const HOME_ROUTES = RouteService.buildRouteContext('/', {
  MAIN: '',
  FAIL: 'fail',
  SUCCESS: 'success',
});

const PROFILE_ROUTES = (() => {
  const ADDRESSES_ROUTES = RouteService.buildRouteContext('/profile/addresses', {
    MAIN: '',
    CREATE: '/create',
    UPDATE: '/update/:id',
  });

  const ORDERS_ROUTES = RouteService.buildRouteContext('/profile/orders', {
    MAIN: '',
    DETAILS: '/details/:id',
    SAVED_BASKET_ITEMS: '/saved-basket-items/:id',
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

  return RouteService.buildRouteContext('/profile', {
    MAIN: '',
    ORDERS: ORDERS_ROUTES,
    ADDRESSES: ADDRESSES_ROUTES,
    SPECIAL_PRODUCTS: '/special-products',
    BONUS_CARD: '/bonus-card',
    FAVORITES: '/favorites',
    PRESCRIPTIONS: PRESCRIPTIONS_ROUTES,
    MY_REGISTRATIONS: MY_REGISTRATIONS_ROUTES,
    MY_ORDERS: '/my-orders',
    MY_COMPANY: '/my-company',
    MY_REQUESTS: '/my-requests',
    MY_ADDRESSES: '/my-addresses',
    MY_WALLET: '/my-wallet',
    NOTIFICATIONS: "/notifications",
  });
})();

const BLOG_ROUTES = RouteService.buildRouteContext('/blog', {
  MAIN: '',
  DETAILS: '/:id',
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
  FAQ: '/faq',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ABOUT_US: '/about-us',
  VACANCIES: '/vacancies',
  HOW_TO_USE_APP: '/how-to-use-app',
  CONTACT: '/contact',
  BUSINESS: '/business',
  CONTRACT: '/contract',
  SERVICES: '/services',
  CLINIC: CLINIC_ROUTES,
  PHARMACIES: '/pharmacies',
  EXCHANGE_RETURN: '/exchange-return',
  WHOLESALE_NEWS: '/wholesale-news',
  WHOLESALE_PROMOTIONS: '/wholesale-promotions',
  CONFIDENTIALITY_CONDITIONS: '/conditions',

  HOME: HOME_ROUTES,
  BLOG: BLOG_ROUTES,
  NEWS: NEWS_ROUTES,
  TENDERS: TENDERS_ROUTES,
  PROFILE: PROFILE_ROUTES,
  PRODUCTS: PRODUCTS_ROUTES,
  WISH_LIST: WISH_LIST_ROUTES,
}

export default ROUTES;