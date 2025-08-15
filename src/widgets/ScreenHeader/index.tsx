import { FC, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { RootStackParams } from 'app/router/RootRouter/types.ts';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

interface Props {
  content: ReactElement;
  hasBackButton?: boolean;
}

export const ScreenHeader: FC<Props> = ({ content, hasBackButton = false }) => {
  const { goBack, canGoBack } =
    useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={styles.wrapper}>
      <View style={styles.startBlock}>
        {hasBackButton && canGoBack() && (
          <TouchableOpacity hitSlop={8} onPress={goBack}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerBlock}>
        <Typography type="title">{content}</Typography>
      </View>
      <View style={styles.endBlock}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: ComponentSize.HeaderSize,
    marginBottom: SPACING.MICRO,
    paddingHorizontal: ComponentSize.ScreenPaddingHorizontal,
    paddingBottom: SPACING.MICRO,
    backgroundColor: lightTheme.main,
    zIndex: 1,
  },
  startBlock: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  endBlock: {
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
