import { startTransition, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { Send } from 'lucide-react-native';
import { IS_IOS } from 'app/config/constants.ts';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import {
  MessagesListProps,
  PrivateMessageProps,
} from 'entities/chat/model/types.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { useLoadMessages } from 'screens/PrivateChat/model/useLoadMessages.ts';
import { useLoadMoreMessages } from 'screens/PrivateChat/model/useLoadMoreMessages.ts';
import { useMemoizedProps } from 'screens/PrivateChat/model/useMemoizedProps.ts';
import { useMessages } from 'screens/PrivateChat/model/useMessages.ts';
import { usePastLatestMessage } from 'screens/PrivateChat/model/usePastLatestMessage.ts';
import { useRenderItem } from 'screens/PrivateChat/model/useRenderItem.tsx';
import { useSaveMessages } from 'screens/PrivateChat/model/useSaveMessages.ts';
import { useScrollToBottom } from 'screens/PrivateChat/model/useScrollToBottom.ts';
import { useSocketListeners } from 'screens/PrivateChat/model/useSocketListeners.ts';
import { useViewableChanges } from 'screens/PrivateChat/model/useViewableChanges.ts';
import {
  MetaRefProps,
  PrivateChatRouteProp,
} from 'screens/PrivateChat/types.ts';
import { BottomButton } from 'screens/PrivateChat/ui/BottomButton.tsx';
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
    shouldScrollToBottom: false,
  });

  const { anyAdmin } = useIsAdmin();
  const selfProfile = useSelfProfile();
  const readerId = anyAdmin ? CHAT_SUPPORT : selfProfile?.id || null;
  const { params } = useRoute<PrivateChatRouteProp>();

  const [chatId, setChatId] = useState<string | null>(params.chatId || null);
  const [text, setText] = useState('');
  const [showBottomButton, setShowBottomButton] = useState(false);

  const { latestMessages, recentlyMessages } = useLoadMessages({
    chatId,
    selfProfile,
  });

  const { deferredMessages, messages, setMessages } = useMessages({
    chatId,
    metaRef,
    recentlyMessages,
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
    setShowBottomButton,
    latestMessages,
  });

  const pastLatestMessage = usePastLatestMessage({
    chatId,
    setMessages,
    metaRef,
    latestMessages,
  });

  useSocketListeners({
    chatId,
    setChatId,
    messages,
    setMessages,
    pastLatestMessage,
    selfProfile,
  });

  useScrollToBottom({ metaRef, listRef, deferredMessages });
  const saveMessages = useSaveMessages({ chatId, messages, viewableItemsRef });

  const renderItem = useRenderItem({ selfProfileId: selfProfile?.id });
  const { viewabilityConfig, keyExtractor, getItemType } = useMemoizedProps();

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

  return (
    <ScreenLayout
      headerContent={<ChatHeader />}
      goBackCallback={saveMessages}
      hasBackButton
    >
      {!!selfProfile?.id && !!deferredMessages.length && (
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
              // estimatedItemSize
              keyExtractor={keyExtractor}
              data={deferredMessages}
              renderItem={renderItem}
              getItemType={getItemType}
              onStartReachedThreshold={2}
              onStartReached={onStartReached}
              onEndReachedThreshold={2}
              onEndReached={onEndReached}
              viewabilityConfig={viewabilityConfig}
              onViewableItemsChanged={onViewableItemsChanged}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              // scrollEventThrottle={16}
            />
            <BottomButton
              show={showBottomButton}
              listRef={listRef}
              chatId={chatId}
              setMessages={setMessages}
              messages={messages}
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
    paddingTop: SPACING.MINI_S,
    paddingBottom: IS_IOS ? SPACING.MINI_S : SPACING.MEDIUM,
    paddingHorizontal: SPACING.DEFAULT,
    backgroundColor: lightTheme.main,
  },
});
