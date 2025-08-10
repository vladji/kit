import { FC, useMemo } from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { ChevronRight, LucideProps } from 'lucide-react-native';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props extends TouchableOpacityProps {
  StartIcon?: FC<LucideProps>;
  noBorder?: boolean;
  textColor?: ColorValue;
}

export const MenuButton: FC<Props> = ({
  StartIcon,
  noBorder,
  textColor,
  children,
  ...props
}) => {
  const borderBottomWidth = noBorder ? 0 : 1;
  const styles = useMemo(
    () => getStyles(borderBottomWidth),
    [borderBottomWidth],
  );

  return (
    <TouchableOpacity {...props} style={styles.wrapper}>
      <View style={styles.main}>
        {!!StartIcon && <StartIcon color={textColor} />}
        <Typography color={textColor}>{children}</Typography>
      </View>
      <ChevronRight color={textColor} />
    </TouchableOpacity>
  );
};

const getStyles = (borderBottomWidth: number) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: SPACING.DEFAULT,
      paddingVertical: SPACING.MINI,
      borderColor: lightTheme.border,
      borderBottomWidth,
    },
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.MEDIUM,
    },
  });
