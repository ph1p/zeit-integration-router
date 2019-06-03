import { HandlerOptions } from '@zeit/integration-utils';

export interface HandlerOptionsRouter extends HandlerOptions {
  currentRoute?: string;
  router?: {
    navigate: (name: string) => void;
    Routes: (fn: (Route: any, currentRoute: string) => any) => any;
  };
}

export interface Params {
  [key: string]: string | number;
}

export interface Routes {
  path: any;
  realPath: string;
  fn: (
    handler?: HandlerOptionsRouter,
    params?: Params
  ) => Promise<string> | string;
}
