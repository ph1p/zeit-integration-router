import { HandlerOptions } from '@zeit/integration-utils';

export interface HandlerOptionsRouter extends HandlerOptions {
  currentPath?: string;
  router?: {
    navigate: (name: string) => void;
    renderRoute: (name: string) => Promise<string> | string;
    currentRoute(): any;
  };
}

export interface Params {
  [key: string]: string | number;
}

export interface Route {
  path: any;
  realPath: string;
  fn: (
    handler?: HandlerOptionsRouter,
    params?: Params
  ) => Promise<string> | string;
}
