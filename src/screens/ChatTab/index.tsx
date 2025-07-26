import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useMemberAllChats } from 'entities/chat/model/useMemberAllChats.ts';
import { ChatItem } from 'screens/ChatTab/ui/ChatItem.tsx';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';

export const ChatTab = () => {
  const { loading, refetch, chats } = useMemberAllChats();

  useEffect(() => {
    const handler = (payload: { chatId: string }) => {
      refetch();
    };
    safeSocket()?.on('chat_updated', handler);

    return () => {
      safeSocket()?.off('chat_updated', handler);
    };
  }, [refetch]);

  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Список чатов" />}
    >
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={chats}
          renderItem={(renderItem) => <ChatItem {...renderItem.item} />}
          keyExtractor={(chat) => chat.chatId}
        />
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    gap: Sizes.Default,
  },
});
