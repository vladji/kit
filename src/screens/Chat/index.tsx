import { ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { RootRouterParams } from 'app/router/RootRouter/types.ts';
import { useGetMessages } from 'entities/Chat/api/useGetMessages.ts';
import { useSenderData } from 'entities/Chat/model/useSenderData.ts';
import { ScreenLayout } from 'shared/ui/ScreenLayout';
import { Spinner } from 'shared/ui/Spinner';
import { Typography } from 'shared/ui/Typography';

export const ChatScreen = () => {
  const {
    params: { to },
  } = useRoute<RouteProp<RootRouterParams['ChatRoute']>>();

  const { uniqueId } = useSenderData();

  const { messages, loading } = useGetMessages({
    from: uniqueId,
    to,
    enabled: !!uniqueId,
  });

  return (
    <ScreenLayout
      headerTitle={<FormattedMessage defaultMessage="Чат с поддержкой" />}
      hasBackButton
    >
      <ScrollView style={styles.wrapper}>
        {loading && <Spinner />}
        {!!messages &&
          messages.map((message) => <Typography>{message.text}</Typography>)}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
