import React, { ReactNode, useContext } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppContext } from 'app/appContext';
import { useSafeArea } from 'shared/styles/useSafeArea.ts';
import { useStyles } from 'shared/styles/useStyles.ts';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(AppContext);
  const safeInsets = useSafeArea();
  const { colors } = useStyles();

  const isLightTheme = theme === 'light';
  const statusBarBackground = colors('backgroundColor').main['backgroundColor'];

  return (
    <View style={[styles.wrapper, safeInsets, colors('backgroundColor').main]}>
      <StatusBar
        barStyle={isLightTheme ? 'dark-content' : 'light-content'}
        backgroundColor={statusBarBackground}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
