import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Send } from 'lucide-react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import {
  CHAT_SUPPORT,
  MESSAGES_DEFAULT_LIMIT,
} from 'entities/chat/model/constants.ts';
import {
  MessagesListProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { useLoadMoreMessages } from 'screens/PrivateChat/model/useLoadMoreMessages.ts';
import { useMessages } from 'screens/PrivateChat/model/useMessages.ts';
import { useRenderItem } from 'screens/PrivateChat/model/useRenderItem.tsx';
import { useSocketListeners } from 'screens/PrivateChat/model/useSocketListeners.ts';
import { useViewableChanges } from 'screens/PrivateChat/model/useViewableChanges.ts';
import { PrivateChatRouteProp } from 'screens/PrivateChat/types.ts';
import { ChatHeader } from 'screens/PrivateChat/ui/Header.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const PrivateChatScreen = () => {
  const listRef = useRef<FlatList<MessagesListProps>>(null);

  const { anyAdmin } = useIsAdmin();
  const selfProfile = useSelfProfile();
  const readerId = anyAdmin ? CHAT_SUPPORT : selfProfile?.id || null;
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [text, setText] = useState('');

  const { deferredMessages, messages, setMessages, setChatHistory } =
    useMessages({
      chatId,
    });

  const { startTransition, onStartReached, onEndReached } = useLoadMoreMessages(
    {
      messages,
      setMessages,
      chatId,
    },
  );

  const { onViewableItemsChanged, viewableItemsRef } = useViewableChanges({
    anyAdmin,
    readerId,
  });

  useSocketListeners({
    chatId,
    setChatId,
    messages,
    setMessages,
    startTransition,
  });

  useEffect(() => {
    return () => {
      if (chatId && viewableItemsRef.current.length) {
        const lastSeenMessages = viewableItemsRef.current.map(
          (item) => item.item,
        );
        setChatHistory(chatId, lastSeenMessages);
      }
    };
  }, [chatId, viewableItemsRef, setChatHistory]);

  const scrollTo = useCallback((index: number) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index,
        animated: false,
        viewPosition: 0,
      });
    });
  }, []);

  const sendMessage = () => {
    if (!selfProfile || !params.peer.id || !text) return;

    const privateMessage: PrivateMessageProps = {
      from: selfProfile,
      to: params.peer,
      text,
      knownChatId: chatId,
    };
    safeSocket()?.emit('private_message', privateMessage);
    startTransition(() => setText(''));
    scrollTo(deferredMessages.length - 1);
  };

  const renderItem = useRenderItem({ selfProfile });

  return (
    <ScreenLayout headerContent={<ChatHeader />} hasBackButton>
      {!!selfProfile && (
        <View style={styles.wrapper}>
          <Image
            style={StyleSheet.absoluteFill}
            source={require('shared/assets/images/pattern-hexagon.jpg')}
            resizeMode="cover"
          />
          <KeyboardAvoidWrapper style={styles.contentWrapper} includeSafeBottom>
            <FlatList
              ref={listRef}
              contentContainerStyle={styles.scrollContent}
              initialNumToRender={MESSAGES_DEFAULT_LIMIT}
              keyExtractor={(item) => item.id}
              data={deferredMessages}
              renderItem={renderItem}
              onStartReachedThreshold={1}
              onStartReached={onStartReached}
              onEndReachedThreshold={1}
              onEndReached={onEndReached}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
              onViewableItemsChanged={onViewableItemsChanged}
              onScrollToIndexFailed={(info) => {
                requestAnimationFrame(() => {
                  listRef.current?.scrollToOffset({
                    offset: info.averageItemLength * info.index,
                    animated: false,
                  });
                });
              }}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
              }}
            />
            <View style={styles.inputBlock}>
              <TextInputAction
                inputValue={text}
                onChangeText={setText}
                onPress={sendMessage}
                Icon={Send}
                chatting
              />
            </View>
          </KeyboardAvoidWrapper>
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: lightTheme.main,
    overflow: 'hidden',
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    gap: SPACING.NANO,
    paddingVertical: SPACING.MINI,
    paddingHorizontal: SPACING.DEFAULT,
  },
  inputBlock: {
    paddingVertical: SPACING.MINI_S,
    paddingHorizontal: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
});
