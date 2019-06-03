import { HandlerOptions } from '@zeit/integration-utils';

export declare function RouteView(
  handler?: HandlerOptionsRouter,
  params?: Params
): Promise<string> | string;

export interface HandlerOptionsRouter extends HandlerOptions {
  currentRoute?: string;
  router?: {
    currentRoute: string;
    navigate: (name: string) => void;
    Routes: () => any;
  };
}

export interface Params {
  [key: string]: string | number;
}

export interface Routes {
  path: any;
  fn: (
    handler?: HandlerOptionsRouter,
    params?: Params
  ) => Promise<string> | string;
}
