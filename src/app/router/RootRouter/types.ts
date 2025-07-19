export enum RootRouter {
  BottomTabs = 'BottomTabs',
  CreateStoreRoute = 'CreateStoreRoute',
  PrivateChatRoute = 'PrivateChatRoute',
}

export interface ChatRouteParams {
  to: string;
  chatId?: string;
}

export interface RootRouterParams {
  CreateStoreRoute: unknown;
  PrivateChatRoute: ChatRouteParams;
}
