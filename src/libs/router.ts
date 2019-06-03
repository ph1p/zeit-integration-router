import { htm } from '@zeit/integration-utils';
import Route from 'route-parser';
import { HandlerOptionsRouter, Routes, Params } from '../types';

export const createRouter = function(defaultRoute = '/') {
  const routes: Array<Routes> = [];

  let currentRoute: any = defaultRoute;

  return {
    addRoute(
      path: string,
      fn: (handler: HandlerOptionsRouter, params: Params) => Promise<string>
    ) {
      routes.push({
        path: new Route(path),
        fn
      });
    },
    async initRouter(handler: HandlerOptionsRouter, loadDefaultRoute = false) {
      if (loadDefaultRoute) {
        currentRoute = defaultRoute;
      }

      handler.router = {
        async navigate(path: string): Promise<void> {
          currentRoute = path;
        },
        async Routes(callback) {
          const route = routes.find(route => route.path.match(currentRoute));

          return callback(
            route
              ? route.fn(handler, route.path.match(currentRoute) || {})
              : (() => htm`no match`)(),
            currentRoute
          );
        }
      };
    }
  };
};
