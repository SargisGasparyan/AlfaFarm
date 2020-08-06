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
  });

  return RouteService.buildRouteContext('/profile', {
    MAIN: '',
    ORDERS: ORDERS_ROUTES,
    ADDRESSES: ADDRESSES_ROUTES,
    MY_REGISTRATIONS: '/my-registrations',

    FAVORITES: '/favorites',
    MY_ORDERS: '/my-orders',
    MY_COMPANY: '/my-company',
    MY_REQUESTS: '/my-requests',
    MY_ADDRESSES: '/my-addresses',
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

const PRODUCTS_ROUTES = RouteService.buildRouteContext('/products', {
  MAIN: '',
  DETAILS: '/details/:id',
  PROPOSAL: '/proposal',
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
  CLINIC: '/clinic',
  PHARMACIES: '/pharmacies',
  EXCHANGE_RETURN: '/exchange-return',
  CONFIDENTIALITY_CONDITIONS: '/conditions',

  HOME: HOME_ROUTES,
  BLOG: BLOG_ROUTES,
  NEWS: NEWS_ROUTES,
  PROFILE: PROFILE_ROUTES,
  PRODUCTS: PRODUCTS_ROUTES,
  WISH_LIST: WISH_LIST_ROUTES,
}

export default ROUTES;