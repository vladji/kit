import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
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
}

export const Message = memo(({ from, text, createdAt, selfId }: Props) => {
  const isSelf = from === selfId;
  const styleMessage = isSelf ? styles.selfMessage : styles.peerMessage;

  return (
    <View style={[styles.wrapper, styleMessage]}>
      <Typography color={lightThemeText.light} leading={16}>
        {text}
      </Typography>
      <Typography size={10} color={lightThemeText.muted}>
        {getHhMm(createdAt)}
      </Typography>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.MINI_S,
    borderRadius: SPACING.MEDIUM,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: COLORS.MESSAGE_PRIMARY,
  },
  peerMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: COLORS.MESSAGE_SECONDARY,
  },
});
