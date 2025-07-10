import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { MainButton } from 'shared/ui/MainButton';
import { Typography } from 'shared/ui/Typography';

interface Props {
  error: Error;
  resetError: () => void;
}

export const ErrorFallback: FC<Props> = ({ error, resetError }) => {
  return (
    <View style={styles.wrapper}>
      <Typography type="header" align="center">
        Something went wrong
      </Typography>
      <Typography type="title" align="center">
        ¯\_(ツ)_/¯
      </Typography>
      {!!error.message && (
        <Typography align="center">{error.message}</Typography>
      )}
      <MainButton onPress={resetError}>{'Close'}</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: Sizes.Large,
    paddingHorizontal: Sizes.Default,
    paddingVertical: Sizes.Large,
  },
});
