import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// TAB SCREENS
import InventoryScreen from "../screens/tab-screen/InventoryScreen";
import PosScreen from "../screens/tab-screen/PosScreen";
import TransactionsScreen from "../screens/tab-screen/TransactionsScreen";
import SalesScreen from "../screens/tab-screen/SalesScreen";

import TabBarIcon from "../components/TabBarIcon";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        gestureEnable: false,
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: "#344C57",
          position: "absolute",
          height: 70,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconSize={30}
              iconName={"shopping-basket"}
              vectorIcon={"fontisto"}
              iconText={"STOCKS"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="pos"
        component={PosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconSize={30}
              iconName={"shopping-pos-machine"}
              vectorIcon={"fontisto"}
              iconText={"POS"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="transaction"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconSize={30}
              iconName={"exchange"}
              vectorIcon={"fontawesome"}
              iconText={"TRANSACTIONS"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="sales"
        component={SalesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconSize={30}
              iconName={"graph"}
              vectorIcon={"simplelineicon"}
              iconText={"SALES"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
