import { startTransition, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { Send } from 'lucide-react-native';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import {
  MessagesListProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { useLoadMoreMessages } from 'screens/PrivateChat/model/useLoadMoreMessages.ts';
import { useMemoizedProps } from 'screens/PrivateChat/model/useMemoizedProps.ts';
import { useMessages } from 'screens/PrivateChat/model/useMessages.ts';
import { useNavigateToBottom } from 'screens/PrivateChat/model/useNavigateToBottom.ts';
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
  const listRef = useRef<FlashListRef<MessagesListProps>>(null);
  const metaRef = useRef<MetaRefProps>({
    loadStartId: null,
    loadEndId: null,
    shouldSetStartChatDate: false,
    shouldScrollToBottom: false,
  });

  const { anyAdmin } = useIsAdmin();
  const selfProfile = useSelfProfile();
  const readerId = anyAdmin ? CHAT_SUPPORT : selfProfile?.id || null;
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [text, setText] = useState('');

  const { deferredMessages, messages, setMessages } = useMessages({
    chatId,
    selfProfile,
    metaRef,
  });

  const { onStartReached, onEndReached } = useLoadMoreMessages({
    messages,
    setMessages,
    chatId,
    metaRef,
  });

  const { onViewableItemsChanged, viewableItemsRef } = useViewableChanges({
    anyAdmin,
    readerId,
  });

  const navigateToBottom = useNavigateToBottom({
    chatId,
    setMessages,
    // listRef,
    // metaRef,
  });

  useSocketListeners({
    chatId,
    setChatId,
    messages,
    setMessages,
    navigateToBottom,
    selfProfile,
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
  };

  const renderItem = useRenderItem({ selfProfile });
  const { viewabilityConfig, maintainVisibleContentPosition, keyExtractor } =
    useMemoizedProps({ listRef });

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
            <FlashList
              ref={listRef}
              contentContainerStyle={styles.scrollContent}
              // drawDistance={windowHeight * 3}
              // masonry
              // onCommitLayoutEffect
              // estimatedItemSize
              keyExtractor={keyExtractor}
              data={deferredMessages}
              renderItem={renderItem}
              onStartReachedThreshold={2}
              onStartReached={onStartReached}
              onEndReachedThreshold={2}
              onEndReached={onEndReached}
              viewabilityConfig={viewabilityConfig}
              onViewableItemsChanged={onViewableItemsChanged}
              // maintainVisibleContentPosition={maintainVisibleContentPosition}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              scrollEventThrottle={16}
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
    paddingHorizontal: SPACING.DEFAULT,
  },
  inputBlock: {
    paddingVertical: SPACING.MINI_S,
    paddingHorizontal: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
});
