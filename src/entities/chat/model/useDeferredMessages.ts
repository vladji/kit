import { useDeferredValue, useRef } from 'react';
import { EMPTY_MESSAGE } from 'entities/chat/model/constants.ts';
import {
  ChatMessageProps,
  MessagesListProps,
} from 'entities/chat/model/types.ts';

export const useDeferredMessages = (messages: MessagesListProps[]) => {
  const fakeFirstMessage = useRef<ChatMessageProps>({
    type: 'message',
    id: EMPTY_MESSAGE,
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
