import { FC } from 'react';
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootRouter, RootStackParams } from 'app/router/RootRouter/types.ts';
import { ChatProps } from 'entities/chat/model/types.ts';
import { usePeerProfile } from 'entities/chat/model/usePeerProfile.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

type Props = ListRenderItemInfo<ChatProps>;

export const ChatItem: FC<Props> = ({
  item: { chatId, lastMessage, members, support },
}) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();
  const peer = usePeerProfile({ members, support });

  const onChatOpen = () => {
    navigate(RootRouter.PrivateChatRoute, {
      peer,
      chatId,
      chatSupport: !!support,
    });
  };

  // TODO: implement react-native-fast-image
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onChatOpen}>
      <Image
        style={styles.avatar}
        source={
          peer.avatarUrl
            ? {
                uri: peer.avatarUrl,
              }
            : require('shared/assets/images/placeholder-512w.png')
        }
        resizeMode="contain"
      />
      <View style={styles.textWrapper}>
        <Typography weight="600">{peer.name}</Typography>
        <Typography numberOfLines={2} ellipsizeMode="tail" weight="300">
          {lastMessage}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: lightTheme.border,
  },
  avatar: {
    width: ComponentSize.AvatarSize,
    height: ComponentSize.AvatarSize,
    borderRadius: 888,
  },
  textWrapper: {
    flex: 1,
    paddingVertical: SPACING.NANO,
    paddingLeft: SPACING.MINI,
    paddingRight: SPACING.DEFAULT,
  },
});
