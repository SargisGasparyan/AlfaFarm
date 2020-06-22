//? Route dynamic configuration tools

import * as React from 'react';

import RouteService from '../services/routes';

//? This helps to add new route to application routing system
export function byRoute(route: string | string[]) {
  return <Component extends React.ComponentClass>(component: Component): Component => {
    return RouteService.addRoute<Component>(
      route,
      component,
      false,
    );
  }
};

//? This helps to add new route to application routing system (Private, only for Authorized users)
export function byPrivateRoute(route: string | string[]) {
  return <Component extends React.ComponentClass>(component: Component): Component => {
    return RouteService.addRoute<Component>(
      route,
      component,
      true,
    );
  }
};