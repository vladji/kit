import { FormattedMessage } from 'react-intl';
import { MainButton } from 'shared/ui/MainButton';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Typography } from 'shared/ui/Typography';

export const HomeScreen = () => {
  return (
    <ScreenLayout headerTitle={<FormattedMessage defaultMessage="Главная" />}>
      <Typography>
        <FormattedMessage defaultMessage="список" />
      </Typography>
      <MainButton>
        <FormattedMessage defaultMessage="Button" />
      </MainButton>
    </ScreenLayout>
  );
};
