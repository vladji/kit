export enum RootRouter {
  BottomTabs = 'BottomTabs',
  CreateStoreRoute = 'CreateStoreRoute',
  ChatRoute = 'ChatRoute',
}

export interface ChatRouteParams {
  to: string;
}

export interface RootRouterParams {
  CreateStoreRoute: unknown;
  ChatRoute: ChatRouteParams;
}
