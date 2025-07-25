import { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { ChevronRight, LucideProps } from 'lucide-react-native';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

interface Props extends TouchableOpacityProps {
  StartIcon?: FC<LucideProps>;
  noBorder?: boolean;
  textColor?: Record<'color', string>;
}

export const MenuButton: FC<Props> = ({
  StartIcon,
  noBorder,
  textColor,
  children,
  ...props
}) => {
  const { colors } = useStyles();
  const borderBottomWidth = { borderBottomWidth: noBorder ? 0 : 1 };

  return (
    <TouchableOpacity
      {...props}
      style={[styles.wrapper, borderBottomWidth, colors('borderColor').muted]}
    >
      <View style={styles.main}>
        {!!StartIcon && <StartIcon color={textColor?.color} />}
        <Typography color={textColor}>{children}</Typography>
      </View>
      <ChevronRight color={textColor?.color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sizes.Default,
    paddingVertical: Sizes.Mini,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.Medium,
  },
});
