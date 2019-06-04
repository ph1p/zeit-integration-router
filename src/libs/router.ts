import { withUiHook, htm } from '@zeit/integration-utils';
import RouteParser from 'route-parser';
import { HandlerOptionsRouter, Route, Params } from '../types';

class ZeitRouter {
  private routes: Array<Route> = [];
  public currentRoute: string;

  constructor() {
    this.currentRoute = '/';
  }

  add(
    path: string,
    fn: (handler: HandlerOptionsRouter, params: Params) => Promise<string>
  ) {
    this.routes.push({
      path: new RouteParser(path),
      realPath: path,
      fn
    });
  }

  async routerUiHook(callback: (handler: HandlerOptionsRouter) => any) {
    const self = this;

    async function getRoute(
      handler: HandlerOptionsRouter,
      path: string = self.currentRoute
    ): Promise<any> {
      const route = self.routes.find(route => route.path.match(path));

      return route
        ? route.fn(handler, route.path.match(path) || {})
        : (() => htm`Sorry, but this page does not exist :/`)();
    }

    return withUiHook(async (handler: HandlerOptionsRouter) => {
      handler.currentRoute = self.currentRoute;
      if (!handler.router) {
        handler.router = {
          navigate(path: string): void {
            handler.currentRoute = path;
            self.currentRoute = path;
          },
          Route: async (path: string) => getRoute(handler, path),
          Routes: async () => getRoute(handler)
        };
      }

      return callback(handler);
    });
  }
}

export default new ZeitRouter();
