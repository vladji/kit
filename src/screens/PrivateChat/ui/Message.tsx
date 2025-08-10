import { ListRenderItemInfo, StyleSheet, View, ViewStyle } from 'react-native';
import { ChatMessageProps } from 'entities/chat/model/types.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  data: ListRenderItemInfo<ChatMessageProps>;
  ownerId: string;
}

export const Message = ({ data, ownerId }: Props) => {
  const { item } = data;
  const { to, text, createdAt } = item;
  const isOwner = ownerId === to.id;

  const customStyles: ViewStyle = isOwner
    ? {
        alignItems: 'flex-end',
        backgroundColor: '#81b3be',
      }
    : {
        alignItems: 'flex-start',
        backgroundColor: '#d5bca4',
      };

  return (
    <View style={[styles.wrapper, customStyles]}>
      <Typography>{text}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: SPACING.MICRO,
    borderRadius: SPACING.MEDIUM,
  },
});
