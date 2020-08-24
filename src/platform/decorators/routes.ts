//? Route dynamic configuration tools

import * as React from 'react';

import RouteService from '../services/routes';

//? This helps to add new route to application routing system
export function byRoute(route: string | string[], guards?: (() => boolean)[]) {
  return <Component extends React.ComponentClass>(component: Component): Component => {
    if (typeof guards !== 'undefined' && guards.some(item => !item())) return component;

    return RouteService.addRoute<Component>(
      route,
      component,
      false,
    );
  }
};

//? This helps to add new route to application routing system (Private, only for Authorized users)
export function byPrivateRoute(route: string | string[], guards?: (() => boolean)[]) {
  return <Component extends React.ComponentClass>(component: Component): Component => {
    if (typeof guards !== 'undefined' && guards.some(item => !item())) return component;

    return RouteService.addRoute<Component>(
      route,
      component,
      true,
    );
  }
};