import React, { FC, ReactElement, ReactNode } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { Spinner } from 'shared/ui/Spinner';
import { ScreenHeader } from 'widgets/ScreenHeader';

interface Props {
  children: ReactNode;
  headerContent?: ReactElement;
  hasBackButton?: boolean;
  loading?: boolean;
}

export const ScreenLayout: FC<Props> = ({
  children,
  headerContent,
  hasBackButton = false,
  loading,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.layout}>
      <View style={[styles.statusBar, { height: top }]} />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {!!headerContent && (
        <ScreenHeader content={headerContent} hasBackButton={hasBackButton} />
      )}
      {loading && <Spinner />}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: lightTheme.main,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: lightTheme.main,
    zIndex: 1,
  },
});
