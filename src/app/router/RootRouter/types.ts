import { ChatMemberProps } from 'entities/chat/model/types.ts';

export enum RootRouter {
  BottomTabs = 'BottomTabs',
  CreateStoreRoute = 'CreateStoreRoute',
  PrivateChatRoute = 'PrivateChatRoute',
}

export interface ChatRouteParams {
  to: ChatMemberProps;
  chatId?: string;
}

export interface RootRouterParams {
  CreateStoreRoute: unknown;
  PrivateChatRoute: ChatRouteParams;
}
