import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChatProps } from 'entities/Chat/model/types.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { Typography } from 'shared/ui/Typography';

export const ChatItem: FC<ChatProps> = ({ chatId, lastMessage }) => {
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
    gap: Sizes.Mini,
    backgroundColor: '#ccc',
  },
});
