import { HandlerOptions } from '@zeit/integration-utils';

export interface Router {
  currentPath?: string;
  navigate: (name: string) => void;
  renderRoute: (name: string) => Promise<string> | string;
  currentRoute?(): any;
}
export interface HandlerOptions extends HandlerOptions {
  router?: Router;
}

export interface Params {
  [key: string]: string | number;
}

export interface Route {
  handler?: HandlerOptions;
  router?: Router;
  params?: Params;
}
export interface RouteCallback {
  (route?: Route): Promise<string> | string;
}

export interface RouteItem {
  path: any;
  realPath: string;
  fn: RouteCallback;
}

export interface ZeitRouterInterface {
  currentPath: string;
  uiHook: (
    callback: (handler: HandlerOptions, router?: any) => any
  ) => any;
  add(path: string, fn: RouteCallback): void;
}
