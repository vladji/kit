import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { getSocket } from 'app/providers/Socket/socket.ts';
import { useGetAllChats } from 'entities/Chat/api/useGetAllChats.ts';
import { useChatUser } from 'entities/Chat/model/useChatUser.ts';
import { ChatItem } from 'screens/ChatTab/ui/ChatItem.tsx';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';

export const ChatTab = () => {
  const { userId, loading: loadingMember } = useChatUser();

  const {
    allChats,
    loading: loadingChats,
    refetch,
  } = useGetAllChats({ member: userId });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (payload: { chatId: string }) => {
      refetch();
    };

    socket.on('chat_updated', handler);

    return () => {
      socket.off('chat_updated', handler);
    };
  }, [refetch]);

  const loading = loadingMember || loadingChats;

  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Список чатов" />}
    >
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={allChats}
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
