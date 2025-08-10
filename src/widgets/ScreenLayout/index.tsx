import React, { FC, ReactElement, ReactNode, useMemo } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Spinner } from 'shared/ui/Spinner';
import { ScreenHeader } from 'widgets/ScreenHeader';

interface Props {
  children: ReactNode;
  headerContent?: ReactElement;
  hasHorizonInsets?: boolean;
  hasBackButton?: boolean;
  loading?: boolean;
}

export const ScreenLayout: FC<Props> = ({
  children,
  headerContent,
  hasHorizonInsets = true,
  hasBackButton = false,
  loading,
}) => {
  const paddingHorizontal = hasHorizonInsets
    ? ComponentSize.ScreenPaddingHorizontal
    : 0;

  const styles = useMemo(
    () => getStyles(paddingHorizontal),
    [paddingHorizontal],
  );

  return (
    <View style={styles.layout}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.wrapper}>
        {loading && <Spinner />}
        {!!headerContent && (
          <ScreenHeader content={headerContent} hasBackButton={hasBackButton} />
        )}
        {children}
      </SafeAreaView>
    </View>
  );
};

const getStyles = (paddingHorizontal: number) =>
  StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: lightTheme.main,
    },
    wrapper: {
      flex: 1,
      paddingTop: SPACING.DEFAULT,
      paddingBottom: SPACING.DEFAULT,
      paddingHorizontal,
    },
  });
