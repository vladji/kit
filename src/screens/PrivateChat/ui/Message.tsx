import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { COLORS } from 'shared/styles/tokens/colors.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  from: string;
  text: string;
  createdAt: Date;
  selfId: string;
}

export const Message = memo(({ from, text, createdAt, selfId }: Props) => {
  const isSelf = from === selfId;
  const styleMessage = isSelf ? styles.selfMessage : styles.peerMessage;

  return (
    <View style={[styles.wrapper, styleMessage]}>
      <Typography color={isSelf ? lightThemeText.light : lightThemeText.light}>
        {text}
      </Typography>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.MICRO,
    borderRadius: SPACING.MEDIUM,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: COLORS.MESSAGE_PRIMARY,
  },
  peerMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLORS.MESSAGE_SECONDARY,
  },
});
