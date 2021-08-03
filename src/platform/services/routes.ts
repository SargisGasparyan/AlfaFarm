//? Route Helper Service
//? The routing system has one more layer, please first read comments on /platform/decorators/routes.ts
import { matchPath } from 'react-router-dom';
import { IRoute } from '../constants/interfaces';
type RouteCallback = (routes: IRoute[]) => void;

class RouteService {
  public static routes: IRoute[] = [];
  public static subscribeUnauthorizedCallbacks: RouteCallback[] = [];
  public static subscribeAuthorizedCallbacks: RouteCallback[] = [];
  //? Check route
  public static isRoute = (route: string): boolean => !!matchPath(window.location.pathname, { path: route, exact: true });
  //? Create Routing Tree
  public static buildRouteContext(prefix: string, routes: { [key:string]: string }) {
    const nativeActions: ProxyHandler<any> = {
      get(target, key) { return typeof target[key] === 'string' ? prefix + target[key] : target[key]; }
    };
    return new Proxy(routes, nativeActions);
  }

  //? Add route to routing system
  //! Will be called only by using the @byRouter or @byPrivateRouter decorator

  public static addRoute<Component extends React.ComponentClass>(
    path: string | string[],
    component: Component,
    isPrivate: boolean,
  ): Component {
    Array.isArray(path) ? path.map((item: string) => RouteService.routes.push({
      path: item,
      component,
      isPrivate,
    })) : RouteService.routes.push({
      path,
      component,
      isPrivate,
    });
    RouteService
      .subscribeUnauthorizedCallbacks
        .map((item) => item(
          RouteService.routes.filter((sub: IRoute) => !sub.isPrivate)
        ));
    RouteService
      .subscribeAuthorizedCallbacks
        .map(item => item(RouteService.routes.filter(sub => sub.isPrivate)));
    return component;
  }

  //? Subscribe to authorized route changes
  public static subscribeAuthorized(callback: RouteCallback) {
    const routes: IRoute[] = RouteService.routes.filter((item: IRoute) => item.isPrivate);
    RouteService
      .subscribeAuthorizedCallbacks
        .push(callback);
    return callback(routes);
  }
  //? Subscribe to unauthorized route changes
  public static subscribeUnauthorized(callback: RouteCallback) {
    RouteService
      .subscribeUnauthorizedCallbacks
        .push(callback);
    return callback(RouteService.routes.filter(item => !item.isPrivate));
  }
}
export default RouteService;
