import { withUiHook, htm } from '@zeit/integration-utils';
import RouteParser from 'route-parser';
import { HandlerOptionsRouter, Route, Params } from '../types';

class ZeitRouter {
  private routes: Array<Route> = [];
  public currentPath: string;

  constructor() {
    this.currentPath = '/';
  }

  /**
   * Adds a route
   * @param path
   * @param fn
   */
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
  /**
   *
   *
   * @param {(handler: HandlerOptionsRouter) => any} callback
   * @returns
   * @memberof ZeitRouter
   */
  routerUiHook(callback: (handler: HandlerOptionsRouter) => any) {
    const self = this;

    /**
     * get a specfic route
     * @param handler
     * @param path
     */
    async function getRoute(
      handler: HandlerOptionsRouter,
      path: string = self.currentPath
    ): Promise<any> {
      const route = self.routes.find(route => route.path.match(path));

      return route
        ? route.fn(handler, route.path.match(path) || {})
        : (() => htm`Sorry, but this page does not exist :/`)();
    }

    return withUiHook(async (handler: HandlerOptionsRouter) => {
      handler.currentPath = self.currentPath;
      handler.router = {
        /**
         * navigate to a new route
         * @param path
         */
        navigate(path: string): void {
          if (path !== self.currentPath) {
            handler.currentPath = path;
            self.currentPath = path;

            callback(handler);
          }
        },
        /**
         * get a specfic route view
         * @param path
         */
        renderRoute: async (path: string) => getRoute(handler, path),
        /**
         * get the current route
         */
        currentRoute: async () => getRoute(handler)
      };

      return callback(handler);
    });
  }
}

export default new ZeitRouter();
