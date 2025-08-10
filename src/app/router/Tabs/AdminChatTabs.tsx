import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AdminChatTabsNames } from 'app/router/Tabs/types.ts';
import { AdminClientsTab } from 'screens/ChatTab/ui/AdminClientsTab.tsx';
import { AdminStoresTab } from 'screens/ChatTab/ui/AdminStoresTab.tsx';
import { lightTheme } from 'shared/styles/theme/theme.ts';
import { SPACING } from 'shared/styles/tokens/spacing.ts';
import { TabBar } from 'shared/ui/TabBar';

const Tabs = createMaterialTopTabNavigator();

export const AdminChatTabs = () => {
  return (
    <Tabs.Navigator
      style={{ marginTop: SPACING.MEDIUM }}
      screenLayout={(props) => <View {...props} style={styles.layout} />}
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

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: lightTheme.main,
  },
});
