export enum RootRouter {
  BottomTabs = 'BottomTabs',
  CreateStoreRoute = 'CreateStoreRoute',
  ChatRoute = 'ChatRoute',
}

export interface RootRouterParams {
  CreateStoreRoute: unknown;
  ChatRoute: { params: { to: string } };
}
