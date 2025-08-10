import { FormattedMessage } from 'react-intl';
import { Typography } from 'shared/ui/Typography';
import { ScreenLayout } from 'widgets/ScreenLayout';

export const CreateStore = () => {
  return (
    <ScreenLayout
      headerContent={<FormattedMessage defaultMessage="Регистрация бизнеса" />}
      hasBackButton
    >
      <Typography>New business</Typography>
    </ScreenLayout>
  );
};
