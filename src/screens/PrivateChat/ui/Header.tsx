import { Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PrivateChatRouteProp } from 'screens/PrivateChat/types.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { Typography } from 'shared/ui/Typography';

export const ChatHeader = () => {
  const { params } = useRoute<PrivateChatRouteProp>();
  if (!params) return null;
  const { peer } = params;

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.avatar}
        source={
          peer.avatarUrl
            ? {
                uri: peer.avatarUrl,
              }
            : require('shared/assets/images/placeholder-512w.png')
        }
        resizeMode="contain"
      />
      <Typography weight="600">{peer.name}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: SPACING.DEFAULT,
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 888,
  },
});
