import { StyleSheet, TouchableOpacity } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { ComponentSize, Sizes } from 'shared/styles/constants/sizes.ts';
import { useStyles } from 'shared/styles/useStyles.ts';
import { Typography } from 'shared/ui/Typography';

export const GoogleLogin = () => {
  const { colors } = useStyles();

  const onPress = () => {
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.button, colors('borderColor').border]}
      onPress={onPress}
    >
      {/*<GoogleIcon />*/}
      <Typography weight="600">
        <FormattedMessage defaultMessage="Войти с Google" />
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: Sizes.Mini,
    alignItems: 'center',
    justifyContent: 'center',
    height: ComponentSize.MainButtonHeight,
    borderRadius: ComponentSize.ButtonBorderRadius,
    borderWidth: 1,
  },
});
