import { FC, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { RootRouterParams } from 'app/router/RootRouter/types.ts';
import { SHADOW } from 'shared/styles/constants/colors.ts';
import { ComponentSize } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  title: ReactElement;
  hasBackButton?: boolean;
}

export const ScreenHeader: FC<Props> = ({ title, hasBackButton = false }) => {
  const { goBack } = useNavigation<NavigationProp<RootRouterParams>>();
  const { colors } = useStyles();

  return (
    <View style={[styles.wrapper, colors('backgroundColor').main]}>
      <View style={styles.leftBlock}>
        {hasBackButton && (
          <TouchableOpacity hitSlop={8} onPress={goBack}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerBlock}>
        <Typography type="title">{title}</Typography>
      </View>
      <View style={styles.rightBlock}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: ComponentSize.HeaderSize,
    paddingHorizontal: ComponentSize.ScreenPaddingHorizontal,
    zIndex: 2,
    ...SHADOW,
  },
  leftBlock: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightBlock: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
