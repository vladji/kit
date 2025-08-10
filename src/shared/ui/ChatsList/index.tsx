import { FlatList, StyleSheet } from 'react-native';
import { QueryObserverResult } from '@tanstack/react-query';
import { PaginationResponse } from 'app/api/types.ts';
import { ChatProps } from 'entities/chat/model/types.ts';
import { useChatUpdated } from 'screens/ChatTab/model/useChatUpdated.ts';
import { ChatItem } from 'screens/ChatTab/ui/ChatItem.tsx';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Spinner } from 'shared/ui/Spinner';

interface Props {
  loading: boolean;
  refetch: () => Promise<
    QueryObserverResult<
      PaginationResponse<{
        chats: ChatProps[];
      }>
    >
  >;
  chats?: ChatProps[];
}

export const ChatsList = ({ loading, refetch, chats }: Props) => {
  useChatUpdated<PaginationResponse<{ chats: ChatProps[] }>>({ refetch });

  return (
    <>
      {loading && <Spinner />}
      {!!chats && (
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={chats}
          renderItem={(renderItem) => <ChatItem {...renderItem.item} />}
          keyExtractor={(chat) => chat.chatId}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    gap: SPACING.DEFAULT,
  },
});
