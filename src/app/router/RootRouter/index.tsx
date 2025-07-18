import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRouter } from 'app/router/RootRouter/types.ts';
import { ChatScreen } from 'screens/Chat';
import { CreateStore } from 'screens/CreateStore';
import BottomTabs from '../BottomTabs/index.tsx';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootRouter.BottomTabs} component={BottomTabs} />
      <Stack.Screen
        name={RootRouter.CreateStoreRoute}
        component={CreateStore}
      />
      <Stack.Screen name={RootRouter.ChatRoute} component={ChatScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
