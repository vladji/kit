import { FC, useMemo } from 'react';
import { Image, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { ADMIN_PLACEHOLDER_AVATAR_URL } from 'entities/admin/model/constants.ts';
import { ChatProps } from 'entities/chat/model/types.ts';
import { UserRoles, UserRolesProps } from 'entities/user/model/types.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

type Props = ListRenderItemInfo<ChatProps> & {
  userId: string | null;
  roles: UserRolesProps;
  anyAdmin: boolean;
};

export const ChatItem: FC<Props> = ({
  userId,
  roles,
  anyAdmin,
  item: { lastMessage, members, support },
}) => {
  const withMember = useMemo(() => {
    if (!userId) {
      return {
        name: 'Unknown',
        avatar: '',
      };
    }

    if (anyAdmin) {
      const filtered = members.filter(
        (member) =>
          member.role !== UserRoles.Admin &&
          member.role !== UserRoles.RootAdmin,
      )[0];

      return {
        name: filtered.name,
        avatar: filtered.avatarUrl,
      };
    }

    if (roles[UserRoles.Store]) {
      const filtered = members.filter(
        (member) => member.role !== UserRoles.Store,
      )[0];

      return {
        name: filtered.name,
        avatar: filtered.avatarUrl,
      };
    }

    if (support) {
      if (support.admin) {
        return {
          name: support.admin.name,
          avatar: support.admin.avatarUrl,
        };
      }
      return {
        name: 'Admin',
        avatar: ADMIN_PLACEHOLDER_AVATAR_URL,
      };
    }

    const member = members.filter((member) => member.id !== userId)[0];

    return {
      name: member.name,
      avatar: member.avatarUrl,
    };
  }, [support, members, userId, anyAdmin, roles]);

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.avatar}
        source={
          withMember.avatar
            ? {
                uri: withMember.avatar,
              }
            : require('shared/assets/images/placeholder-512w.png')
        }
        resizeMode="contain"
      />
      <Typography type="caption" weight="600">
        {withMember.name}
      </Typography>
      <Typography>{lastMessage}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.MINI,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
});
