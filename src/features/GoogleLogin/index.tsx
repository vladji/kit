import { StyleSheet, TouchableOpacity } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { GoogleIcon } from 'shared/assets/icons/GoogleIcon.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { ComponentSize, SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

export const GoogleLogin = () => {
  const onPress = () => {
    return null;
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <GoogleIcon />
      <Typography weight="600">
        <FormattedMessage defaultMessage="Войти с Google" />
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: SPACING.MINI,
    alignItems: 'center',
    justifyContent: 'center',
    height: ComponentSize.MainButtonSize,
    borderRadius: ComponentSize.ButtonBorderRadius,
    borderWidth: 1,
    borderColor: lightTheme.border,
  },
});
