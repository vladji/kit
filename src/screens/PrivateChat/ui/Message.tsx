import { ListRenderItemInfo, StyleSheet, View, ViewStyle } from 'react-native';
import { ChatMessageProps } from 'entities/chat/model/types.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { COLORS } from 'shared/styles/tokens/colors.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  data: ListRenderItemInfo<ChatMessageProps>;
  selfId: string;
}

export const Message = ({ data, selfId }: Props) => {
  const { item: message } = data;
  const { from, to, text, createdAt } = message;
  const isSelf = from === selfId;

  const customStyles: ViewStyle = isSelf
    ? {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: COLORS.MESSAGE_PRIMARY,
      }
    : {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: COLORS.MESSAGE_SECONDARY,
      };

  return (
    <View style={[styles.wrapper, customStyles]}>
      <Typography color={isSelf ? lightThemeText.light : lightThemeText.light}>
        {text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.MICRO,
    borderRadius: SPACING.MEDIUM,
  },
});
