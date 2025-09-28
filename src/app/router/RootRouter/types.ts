import {
  ChatMemberProps,
  UnreadCountProps,
} from 'entities/chat/model/types.ts';

export enum RootRouter {
  BottomTabs = 'BottomTabs',
  CreateStoreRoute = 'CreateStoreRoute',
  PrivateChatRoute = 'PrivateChatRoute',
}

export interface ChatRouteParams {
  peer: ChatMemberProps;
  chatId: string | null;
  chatSupport: boolean;
  unreadCount?: UnreadCountProps;
}

export type RootStackParams = {
  [RootRouter.CreateStoreRoute]: undefined;
  [RootRouter.PrivateChatRoute]: ChatRouteParams;
};
