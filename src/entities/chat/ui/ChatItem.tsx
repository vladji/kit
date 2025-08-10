import { FC } from 'react';
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatProps } from 'entities/chat/model/types.ts';
import { useWithChatMember } from 'entities/chat/model/useWithChatMember.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

type Props = ListRenderItemInfo<ChatProps>;

export const ChatItem: FC<Props> = ({
  item: { lastMessage, members, support },
}) => {
  const withMember = useWithChatMember({ members, support });

  return (
    <TouchableOpacity style={styles.wrapper}>
      <Image
        style={styles.avatar}
        source={
          withMember.avatarUrl
            ? {
                uri: withMember.avatarUrl,
              }
            : require('shared/assets/images/placeholder-512w.png')
        }
        resizeMode="contain"
      />
      <View style={styles.textWrapper}>
        <Typography weight="600">{withMember.name}</Typography>
        <Typography weight="300">{lastMessage}</Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: SPACING.MINI,
    borderBottomWidth: 1,
    borderColor: lightTheme.border,
  },
  avatar: {
    width: ComponentSize.AvatarSize,
    height: ComponentSize.AvatarSize,
    borderRadius: 9999,
  },
  textWrapper: {
    paddingVertical: SPACING.NANO,
  },
});
