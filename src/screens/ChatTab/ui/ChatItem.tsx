import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChatProps } from 'entities/chat/model/types.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

export const ChatItem: FC<ChatProps> = ({ chatId, lastMessage, support }) => {
  return (
    <View style={styles.wrapper}>
      <Typography type="caption" weight="bold">
        {chatId}
      </Typography>
      <Typography>{lastMessage}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.MINI,
    backgroundColor: '#ccc',
  },
});
