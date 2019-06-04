import { HandlerOptions } from '@zeit/integration-utils';

export interface HandlerOptionsRouter extends HandlerOptions {
  currentRoute?: string;
  router?: {
    currentRoute?: string;
    navigate?: (name: string) => void;
    Route: (name: string) => Promise<string> | string;
    Routes: () => any;
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
