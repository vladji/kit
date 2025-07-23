import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { useGetAllChats } from 'entities/chat/api/useGetAllChats.ts';
import { ChatItem } from 'screens/ChatTab/ui/ChatItem.tsx';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';

export const ChatTab = () => {
  const { data: userDbId, isLoading: userDbIdLoading } =
    useGetAsyncStorage<string>(AsyncStorageKeys.Token);

  const {
    allChats,
    isLoading: chatsLoading,
    refetch,
  } = useGetAllChats({ member: userDbId });

  useEffect(() => {
    const handler = (payload: { chatId: string }) => {
      refetch();
    };
    safeSocket()?.on('chat_updated', handler);

    return () => {
      safeSocket()?.off('chat_updated', handler);
    };
  }, [refetch]);

  const loading = userDbIdLoading || chatsLoading;

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
