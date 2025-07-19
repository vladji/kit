import { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import { BRAND_COLOR } from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

export type LucideIconFC = (props: LucideProps) => ReactNode;

interface Props {
  onPress: () => void;
  Icon: LucideIconFC;
  text: ReactElement;
  active: boolean;
}

export const TabButton: FC<Props> = ({ onPress, Icon, text, active }) => {
  const { fontColors } = useStyles();
  const iconColor = active ? BRAND_COLOR : fontColors.main.color;
  const fontColor = { color: active ? BRAND_COLOR : undefined };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} hitSlop={10}>
      <Icon size={20} color={iconColor} />
      <Typography style={fontColor} size={10}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: Sizes.Micro,
    alignItems: 'center',
  },
});
