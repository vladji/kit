import {
  Dispatch,
  SetStateAction,
  startTransition,
  useEffect,
  useState,
} from 'react';
import { safeSocket } from 'app/providers/Socket/socket.ts';
import {
  ChatMemberProps,
  MessageProps,
  MessagesUpdatedProps,
  PrivateMessageSocketProps,
  UnreadCountProps,
} from 'entities/chat/model/types.ts';
import { binarySearch } from 'shared/lib/binary-search.ts';

interface Props {
  chatId: string | null;
  setChatId: Dispatch<SetStateAction<string | null>>;
  messages: MessageProps[];
  setMessages: Dispatch<SetStateAction<MessageProps[]>>;
  pastSelfMessage: (message: MessageProps) => void;
  pastPeerMessage: (message: MessageProps) => void;
  selfProfile: ChatMemberProps | null;
  readerId: string | null;
  unreadData?: UnreadCountProps;
}

export const useSocketListeners = ({
  chatId,
  setChatId,
  messages,
  setMessages,
  pastSelfMessage,
  pastPeerMessage,
  selfProfile,
  readerId,
  unreadData,
}: Props) => {
  const unreadInitial = readerId && unreadData ? unreadData[readerId] : 0;
  const [unreadCounter, setUnreadCounter] = useState(unreadInitial);

  useEffect(() => {
    safeSocket()?.on(
      'private_message',
      ({ message, meta }: PrivateMessageSocketProps) => {
        if (!chatId) {
          startTransition(() => setChatId(message.chatId));
        }
        if (message.chatId === chatId) {
          const selfMessage = message.from === selfProfile?.id;
          if (selfMessage) {
            pastSelfMessage(message);
          } else {
            pastPeerMessage(message);
          }
        }
        if (readerId && meta.unreadCount[readerId] >= 0) {
          startTransition(() => setUnreadCounter(meta.unreadCount[readerId!]));
        }
      },
    );

    return () => {
      safeSocket()?.off('private_message');
    };
  }, [
    chatId,
    readerId,
    setChatId,
    setMessages,
    selfProfile,
    pastSelfMessage,
    pastPeerMessage,
  ]);

  useEffect(() => {
    safeSocket()?.on('messages_updated', (data: MessagesUpdatedProps) => {
      if (readerId && data.unreadCount && data.unreadCount[readerId] >= 0) {
        startTransition(() => setUnreadCounter(data.unreadCount![readerId]));
      }

      if (data.chatId === chatId && !!data.readMessageIds) {
        setTimeout(() => {
          let foundCount = 0;
          data.readMessageIds?.forEach((id) => {
            const messageIndex = binarySearch(id, messages);
            const message = messages[messageIndex];
            if (message?.id) {
              foundCount++;
              message.read = true;
            }
          });

          if (foundCount) {
            startTransition(() => {
              setMessages((prev) => [...prev]);
            });
          }
        });
      }
    });

    return () => {
      safeSocket()?.off('messages_updated');
    };
  }, [chatId, messages, setMessages, readerId]);

  return {
    unreadCounter,
  };
};
