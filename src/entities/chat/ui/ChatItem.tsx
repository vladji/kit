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
import { useIsAdmin } from 'entities/admin/model/useIsAdmin.ts';
import { CHAT_SUPPORT } from 'entities/chat/model/constants.ts';
import { ChatProps } from 'entities/chat/model/types.ts';
import { usePeerProfile } from 'entities/chat/model/usePeerProfile.ts';
import { useSelfProfile } from 'entities/chat/model/useSelfProfile.ts';
import { CounterBadge } from 'entities/chat/ui/CounterBadge.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

type Props = ListRenderItemInfo<ChatProps>;

export const ChatItem: FC<Props> = ({
  item: { chatId, lastMessage, members, support, unreadCount },
}) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();

  const { anyAdmin } = useIsAdmin();
  const selfProfile = useSelfProfile();
  const readerId = anyAdmin ? CHAT_SUPPORT : selfProfile?.id || null;

  const peer = usePeerProfile({ members, support });
  const unreadCounter = readerId ? unreadCount[readerId] : 0;

  const onChatOpen = () => {
    navigate(RootRouter.PrivateChatRoute, {
      peer,
      chatId,
      chatSupport: !!support,
      unreadCount,
    });
  };

  // TODO: implement react-native-fast-image
  return (
    <TouchableOpacity style={styles.button} onPress={onChatOpen}>
      <View style={styles.main}>
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
      </View>
      <View style={styles.endSide}>
        {!!unreadCounter && <CounterBadge counter={unreadCounter} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: SPACING.MICRO,
    paddingHorizontal: SPACING.MINI,
    paddingVertical: SPACING.MINI_S,
    borderBottomWidth: 1,
    borderColor: lightTheme.border,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: ComponentSize.AvatarSize,
    height: ComponentSize.AvatarSize,
    borderRadius: 888,
  },
  textWrapper: {
    paddingVertical: SPACING.NANO,
    paddingLeft: SPACING.MINI,
    paddingRight: SPACING.DEFAULT,
  },
  endSide: {
    gap: SPACING.MINI_S,
    justifyContent: 'center',
  },
});
