import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import { RootRouter } from 'app/router/RootRouter/types.ts';
import { CreateStore } from 'screens/CreateStore';
import { PrivateChatScreen } from 'screens/PrivateChat';
import BottomTabs from '../BottomTabs/index.tsx';

const Stack = createNativeStackNavigator();

export default () => {
  useEffect(() => {
    (async () => {
      await BootSplash.hide({ fade: true });
      return null;
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RootRouter.BottomTabs} component={BottomTabs} />
        <Stack.Screen
          name={RootRouter.CreateStoreRoute}
          component={CreateStore}
        />
        <Stack.Screen
          name={RootRouter.PrivateChatRoute}
          component={PrivateChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
