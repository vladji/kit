import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabs } from 'app/router/BottomTabs/types.ts';
import { ChatTab } from 'screens/ChatTab';
import { HomeTab } from 'screens/Home';
import { SettingsTab } from 'screens/SettingsTab';
import { BottomNavBar } from 'widgets/BottomNavBar';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={BottomTabs.Home} component={HomeTab} />
      <Tab.Screen name={BottomTabs.Chat} component={ChatTab} />
      <Tab.Screen name={BottomTabs.Settings} component={SettingsTab} />
    </Tab.Navigator>
  );
};
