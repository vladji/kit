import { FlatList, StyleSheet } from 'react-native';
import { ChatProps } from 'entities/chat/model/types.ts';
import { useChatUpdated } from 'entities/chat/model/useChatUpdated.ts';
import { ChatItem } from 'entities/chat/ui/ChatItem.tsx';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Spinner } from 'shared/ui/Spinner';

interface Props {
  loading: boolean;
  chats?: ChatProps[];
}

export const ChatsList = ({ loading, chats }: Props) => {
  useChatUpdated();
  return (
    <>
      {loading && <Spinner />}
      {!!chats && (
        <FlatList
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
          data={chats}
          renderItem={(item) => <ChatItem {...item} />}
          keyExtractor={(chat) => chat.chatId}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginTop: SPACING.DEFAULT,
  },
  scrollContainer: {
    gap: SPACING.DEFAULT,
  },
});
