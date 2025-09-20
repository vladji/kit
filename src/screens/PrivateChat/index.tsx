import { startTransition, useRef, useState, useTransition } from 'react';
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
import { useLoadMessages } from 'screens/PrivateChat/model/useLoadMessages.ts';
import { useMemoizedProps } from 'screens/PrivateChat/model/useMemoizedProps.ts';
import { useMessages } from 'screens/PrivateChat/model/useMessages.ts';
import { useRenderItem } from 'screens/PrivateChat/model/useRenderItem.tsx';
import { useSaveMessages } from 'screens/PrivateChat/model/useSaveMessages.ts';
import { useSocketListeners } from 'screens/PrivateChat/model/useSocketListeners.ts';
import { useViewableChanges } from 'screens/PrivateChat/model/useViewableChanges.ts';
import {
  MetaRefProps,
  PrivateChatRouteProp,
} from 'screens/PrivateChat/types.ts';
import { ChatHeader } from 'screens/PrivateChat/ui/Header.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { KeyboardAvoidWrapper } from 'shared/ui/KeyboardAvoid/KeyboardAvoidWrapper.tsx';
import { TextInputAction } from 'shared/ui/TextInputAction';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const PrivateChatScreen = () => {
  const listRef = useRef<FlatList<MessagesListProps>>(null);
  const metaRef = useRef<MetaRefProps>({
    shouldScrollToEnd: false,
  });

  const { anyAdmin } = useIsAdmin();
  const selfProfile = useSelfProfile();
  const readerId = anyAdmin ? CHAT_SUPPORT : selfProfile?.id || null;
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [text, setText] = useState('');
  const [isTransition, startTransitionMessages] = useTransition();

  const { deferredMessages, messages, setMessages } = useMessages({
    chatId,
    startTransitionMessages,
  });

  const { onStartReached, onEndReached } = useLoadMessages({
    messages,
    setMessages,
    chatId,
    startTransitionMessages,
    isTransition,
  });

  const { onViewableItemsChanged, viewableItemsRef } = useViewableChanges({
    anyAdmin,
    readerId,
  });

  useSocketListeners({
    chatId,
    setChatId,
    messages,
    setMessages,
    startTransitionMessages,
  });

  useSaveMessages({ chatId, viewableItemsRef, messages });

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
    metaRef.current.shouldScrollToEnd = true;
  };

  const renderItem = useRenderItem({ selfProfile });
  const {
    onScrollToIndexFailed,
    viewabilityConfig,
    maintainVisibleContentPosition,
    keyExtractor,
  } = useMemoizedProps({ listRef });

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
              initialNumToRender={31}
              maxToRenderPerBatch={MESSAGES_DEFAULT_LIMIT}
              keyExtractor={keyExtractor}
              data={deferredMessages}
              renderItem={renderItem}
              onStartReachedThreshold={2}
              onStartReached={onStartReached}
              onEndReachedThreshold={2}
              onEndReached={onEndReached}
              viewabilityConfig={viewabilityConfig}
              onViewableItemsChanged={onViewableItemsChanged}
              onScrollToIndexFailed={onScrollToIndexFailed}
              maintainVisibleContentPosition={maintainVisibleContentPosition}
              keyboardShouldPersistTaps="handled"
              removeClippedSubviews
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
