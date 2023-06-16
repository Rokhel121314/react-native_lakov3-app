import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// TAB SCREENS
import InventoryScreen from "../screens/tab-screen/InventoryScreen";
import PosScreen from "../screens/tab-screen/PosScreen";
import TransactionsScreen from "../screens/tab-screen/TransactionsScreen";
import SalesScreen from "../screens/tab-screen/SalesScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="inventory" component={InventoryScreen} />
      <Tab.Screen name="pos" component={PosScreen} />
      <Tab.Screen name="transaction" component={TransactionsScreen} />
      <Tab.Screen name="sales" component={SalesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
