import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';
import { getHhMm } from 'shared/lib/dates.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { COLORS } from 'shared/styles/tokens/colors.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  from: string;
  text: string;
  createdAt: string;
  selfId: string;
  read: boolean;
}

export const Message = memo(
  ({ from, text, createdAt, selfId, read }: Props) => {
    const isSelf = from === selfId;
    const styleMessage = isSelf ? styles.selfMessage : styles.peerMessage;
    const emptyString = isSelf ? '           .' : '        .';

    return (
      <View style={[styles.wrapper, styleMessage]}>
        <Typography weight="500" color={lightThemeText.light}>
          {text}
          <Text style={styles.emptyString}>{emptyString}</Text>
        </Typography>
        <View style={styles.badge}>
          <Typography size={10} color={lightThemeText.muted} align="right">
            {getHhMm(createdAt)}
          </Typography>
          <View>
            {isSelf && !read && (
              <Check size={14} color={lightThemeText.muted} />
            )}
            {isSelf && read && (
              <CheckCheck size={14} color={lightThemeText.muted} />
            )}
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '85%',
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.MINI_S,
    borderRadius: SPACING.MEDIUM,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.MESSAGE_PRIMARY,
  },
  peerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.MESSAGE_SECONDARY,
  },
  emptyString: {
    color: 'transparent',
  },
  badge: {
    position: 'absolute',
    bottom: SPACING.MINI_S,
    right: SPACING.MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
