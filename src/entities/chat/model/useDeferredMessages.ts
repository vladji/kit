import { useDeferredValue, useRef } from 'react';
import {
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

export const useDeferredMessages = (messages: MessagesListProps[]) => {
  const fakeFirstMessage = useRef<ChatMessageProps>({
    type: 'message',
    id: 'kit',
    chatId: '',
    from: '',
    to: '',
    text: '',
    read: true,
    createdAt: '',
    updatedAt: '',
  });

  return useDeferredValue([fakeFirstMessage.current, ...messages]);
};
