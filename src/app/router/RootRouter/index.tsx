import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRouter } from 'app/router/RootRouter/types.ts';
import BottomTabs from '../BottomTabs/index.tsx';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootRouter.BottomTabs} component={BottomTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);
