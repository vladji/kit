import { RouteProp } from '@react-navigation/native';
import { RootRouter, RootStackParams } from 'app/router/RootRouter/types.ts';

export type PrivateChatRouteProp = RouteProp<
  RootStackParams,
  RootRouter.PrivateChatRoute
>;

export interface MetaRefProps {
  loadStartId: string | null;
  loadEndId: string | null;
  shouldScrollToBottom: boolean;
}
