import { withUiHook, htm } from '@zeit/integration-utils';
import RouteParser from 'route-parser';
import {
  HandlerOptions,
  RouteItem,
  Router,
  ZeitRouterInstance,
  RouteCallback,
  ZeitRouterConstructor
} from './types';

class RouterClass implements ZeitRouterInstance {
  private routes: Array<RouteItem> = [];
  public previousPath: string;
  public currentPath: string;

  /**
   * Start path
   * @param path
   */
  constructor(public path: string = '/') {
    this.previousPath = path;
    this.currentPath = path;
  }

  /**
   * Adds a route
   * @param path
   * @param fn
   */
  add(path: string, fn: RouteCallback, silent: boolean = false): void {
    this.routes.push({
      path: new RouteParser(path),
      realPath: path,
      fn,
      silent
    });
  }

  /**
   * get a specfic route
   * @param handler
   * @param path
   */
  getRenderedRoute(
    handler: HandlerOptions,
    path: string = this.currentPath,
    router: Router
  ): any {
    const route = this.getRouteByPath(path);

    return route
      ? route.fn({ handler, router, htm, params: route.path.match(path) || {} })
      : (() => htm`Sorry, but this page does not exist :/`)();
  }

  /**
   * Get route by path from route array
   * @param path
   */
  getRouteByPath(path: string): RouteItem {
    return this.routes.find(route => route.path.match(path));
  }

  /**
   * The uiHook-wrapper
   *
   * @returns
   * @memberof ZeitRouter
   */
  uiHook(callback: (handler: HandlerOptions, router?: any) => any) {
    const self = this;

    return withUiHook(async (handler: HandlerOptions) => {
      const metadata = await handler.zeitClient.getMetadata();

      delete metadata.currentPath;
      delete metadata.previousPath;

      await handler.zeitClient.setMetadata(metadata);

      const isSilentRoute =
        self.getRouteByPath(metadata.currentPath) &&
        self.getRouteByPath(metadata.currentPath).silent &&
        handler.payload.action === 'view';

      if (!metadata.currentPath) {
        metadata.currentPath = self.currentPath;
        metadata.previousPath = self.currentPath;
        await handler.zeitClient.setMetadata(metadata);
      }

      // detect route
      if (handler.payload.action.startsWith('/') || isSilentRoute) {
        self.previousPath = isSilentRoute
          ? self.previousPath
          : self.currentPath;
        self.currentPath = isSilentRoute
          ? self.previousPath
          : handler.payload.action;

        metadata.currentPath = self.currentPath;
        metadata.previousPath = self.previousPath;

        await handler.zeitClient.setMetadata(metadata);
      }

      /**
       * navigate to a new route
       * @param path
       */
      const navigate = async (path: string): Promise<void> => {
        if (path !== metadata.currentPath) {
          self.currentPath = path;
          self.previousPath = self.currentPath;

          metadata.currentPath = self.currentPath;
          metadata.previousPath = self.previousPath;
          await handler.zeitClient.setMetadata(metadata);
        }
      };

      /**
       * get a specfic route view
       * @param path
       */
      const renderRoute = (path: string) =>
        self.getRenderedRoute(handler, path, {
          renderRoute,
          navigate
        });

      const router = {
        get currentPath(): string {
          return metadata.currentPath;
        },
        get previousPath(): string {
          return metadata.previousPath;
        },
        /**
         * get the current route
         */
        get currentRoute() {
          return self.getRenderedRoute(handler, metadata.currentPath, {
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

export const ZeitRouter: ZeitRouterConstructor = RouterClass;
