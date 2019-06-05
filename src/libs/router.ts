import { withUiHook, htm } from '@zeit/integration-utils';
import RouteParser from 'route-parser';
import {
  HandlerOptions,
  RouteItem,
  Router,
  ZeitRouterInterface,
  RouteCallback
} from '../types';


class ZeitRouter implements ZeitRouterInterface {
  private routes: Array<RouteItem> = [];
  public currentPath: string;

  /**
   * Start path
   * @param path
   */
  constructor(path: string = '/') {
    this.currentPath = path;
  }

  /**
   * Adds a route
   * @param path
   * @param fn
   */
  add(
    path: string,
    fn: RouteCallback
  ): void {
    this.routes.push({
      path: new RouteParser(path),
      realPath: path,
      fn
    });
  }
  /**
   *
   *
   * @returns
   * @memberof ZeitRouter
   */
  uiHook(callback: (handler: HandlerOptions, router?: any) => any) {
    const self = this;

    /**
     * get a specfic route
     * @param handler
     * @param path
     */
    function getRoute(
      handler: HandlerOptions,
      path: string = self.currentPath,
      router: Router
    ): any {
      const route = self.routes.find(route => route.path.match(path));

      return route
        ? route.fn({ handler, router, params: route.path.match(path) || {} })
        : (() => htm`Sorry, but this page does not exist :/`)();
    }

    return withUiHook(async (handler: HandlerOptions) => {
      // detect route
      if (handler.payload.action.startsWith('/')) {
        self.currentPath = handler.payload.action;
      }

      /**
       * navigate to a new route
       * @param path
       */
      const navigate = (path: string): void => {
        if (path !== self.currentPath) {
          self.currentPath = path;
        }
      };

      /**
       * get a specfic route view
       * @param path
       */
      const renderRoute = (path: string) =>
        getRoute(handler, path, {
          renderRoute,
          navigate
        });

      const router = {
        get currentPath(): string {
          return self.currentPath;
        },
        /**
         * get the current route
         */
        get currentRoute() {
          return getRoute(handler, self.currentPath, {
            navigate,
            renderRoute
          });
        },
        renderRoute,
        navigate
      };

      return callback(handler, router);
    });
  }
}

export default ZeitRouter;
