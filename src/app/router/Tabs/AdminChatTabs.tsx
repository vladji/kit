import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AdminChatTabsNames } from 'app/router/Tabs/types.ts';
import { AdminClientsTab } from 'screens/ChatTab/ui/AdminClientsTab.tsx';
import { AdminStoresTab } from 'screens/ChatTab/ui/AdminStoresTab.tsx';
import { LIGHT_COLOR } from 'shared/styles/constants/colors.ts';
import { Sizes } from 'shared/styles/constants/sizes.ts';
import { TabBar } from 'shared/ui/TabBar';

const Tabs = createMaterialTopTabNavigator();

export const AdminChatTabs = () => {
  return (
    <Tabs.Navigator
      style={{ marginTop: Sizes.Medium }}
      screenLayout={(props) => (
        <View
          {...props}
          style={{
            flex: 1,
            backgroundColor: LIGHT_COLOR,
          }}
        />
      )}
      screenOptions={{
        tabBarAllowFontScaling: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name={AdminChatTabsNames.Clients}
        component={AdminClientsTab}
      />
      <Tabs.Screen
        name={AdminChatTabsNames.Stores}
        component={AdminStoresTab}
      />
    </Tabs.Navigator>
  );
};
