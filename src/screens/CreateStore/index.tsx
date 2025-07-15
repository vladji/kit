import { FormattedMessage } from 'react-intl';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Typography } from 'shared/ui/Typography';

export const CreateStore = () => {
  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Регистрация бизнеса" />}
      hasBackButton
    >
      <Typography>New business</Typography>
    </ScreenLayout>
  );
};
