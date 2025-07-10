import { FC, ReactElement, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { ScreenHeader } from 'shared/ui/ScreenHeader';

interface Props {
  children: ReactNode;
  headerTitle?: ReactElement;
  hasHorizonInsets?: boolean;
}

export const ScreenLayout: FC<Props> = ({
  children,
  headerTitle,
  hasHorizonInsets = true,
}) => {
  const { colors } = useStyles();
  const paddingHorizontal = hasHorizonInsets
    ? { paddingHorizontal: ComponentSize.ScreenPaddingHorizontal }
    : { paddingHorizontal: 0 };

  return (
    <>
      {!!headerTitle && <ScreenHeader title={headerTitle} />}
      <View
        style={[
          paddingHorizontal,
          styles.wrapper,
          colors('backgroundColor').main,
        ]}
      >
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Sizes.Default,
    zIndex: 1,
  },
});
