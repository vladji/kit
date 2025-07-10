import { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

interface Props extends TouchableOpacityProps {
  noBorder?: boolean;
}

export const MenuButton: FC<Props> = ({ noBorder, children, ...props }) => {
  const { colors } = useStyles();
  const borderBottomWidth = { borderBottomWidth: noBorder ? 0 : 1 };

  return (
    <TouchableOpacity
      {...props}
      style={[styles.wrapper, borderBottomWidth, colors().border]}
    >
      <Typography>{children}</Typography>
      <ChevronRight />
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
});
