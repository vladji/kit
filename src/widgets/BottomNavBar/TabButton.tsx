import { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

export type LucideIconFC = (props: LucideProps) => ReactNode;

interface Props {
  onPress: () => void;
  Icon: LucideIconFC;
  text: ReactElement;
  active: boolean;
}

export const TabButton: FC<Props> = ({ onPress, Icon, text, active }) => {
  const iconColor = active ? lightTheme.brand : lightThemeText.main;
  const fontColor = active ? lightTheme.brand : undefined;

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} hitSlop={10}>
      <Icon size={20} color={iconColor} />
      <Typography color={fontColor} size={10}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.MICRO,
    alignItems: 'center',
  },
});
