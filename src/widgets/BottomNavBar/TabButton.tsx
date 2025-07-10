import { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { Typography } from 'shared/ui/Typography';

export type LucideIconFC = (props: LucideProps) => ReactNode;

interface Props {
  onPress: () => void;
  Icon: LucideIconFC;
  text: ReactElement;
}

export const TabButton: FC<Props> = ({ onPress, Icon, text }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Icon size={20} />
      <Typography size={10}>{text}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: Sizes.Micro,
    alignItems: 'center',
  },
});
