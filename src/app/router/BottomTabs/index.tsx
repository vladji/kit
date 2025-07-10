import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabs } from 'app/router/BottomTabs/types.ts';
import { HomeScreen } from 'screens/Home';
import { SettingsScreen } from 'screens/Settings';
import { BottomNavBar } from 'widgets/BottomNavBar';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={BottomTabs.Restaurants} component={HomeScreen} />
      <Tab.Screen name={BottomTabs.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};
