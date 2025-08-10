import { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { QueryObserverResult } from '@tanstack/react-query';
import { PaginationResponse } from 'app/api/types.ts';
import { AppContext } from 'app/appContext';
import { ChatProps } from 'entities/chat/model/types.ts';
import { useChatUpdated } from 'entities/chat/model/useChatUpdated.ts';
import { ChatItem } from 'entities/chat/ui/ChatItem.tsx';
import { useIsAdmin } from 'shared/hooks/useIsAdmin.ts';
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
  const { chatProfile, roles } = useContext(AppContext);
  const { anyAdmin } = useIsAdmin();
  useChatUpdated({ refetch });

  return (
    <>
      {loading && <Spinner />}
      {!!chats && (
        <FlatList
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
          data={chats}
          renderItem={(item) => (
            <ChatItem
              {...item}
              userId={chatProfile?.userId || null}
              roles={roles}
              anyAdmin={anyAdmin}
            />
          )}
          keyExtractor={(chat) => chat.chatId}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginTop: SPACING.DEFAULT,
  },
  scrollContainer: {
    gap: SPACING.DEFAULT,
  },
});
