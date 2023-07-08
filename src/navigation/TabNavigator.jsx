import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// TAB SCREENS
import StockScreen from "../screens/tab-screen/StockScreen";
import PosScreen from "../screens/tab-screen/PosScreen";
import TransactionsScreen from "../screens/tab-screen/TransactionsScreen";
import SalesScreen from "../screens/tab-screen/SalesScreen";
import UserScreen from "../screens/tab-screen/UserScreen";

import TabBarIcon from "../components/TabBarIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../redux/productSlice";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import {
  getAllTransactions,
  getTransactionTotals,
} from "../redux/transactionSlice";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { productDetail, productData } = useSelector((state) => state.product);
  const { uid, fireBaseAuthenticateUser } = useFirebaseAuth();

  useEffect(() => {
    fireBaseAuthenticateUser().then(() => {
      if (uid === null) {
        navigation.navigate("login");
      } else if (uid !== null) {
        dispatch(getAllProduct(userData.user_id));
        dispatch(getAllTransactions(userData.user_id)).then(() => {
          dispatch(getTransactionTotals());
        });
      }
    });
  }, [userData, productDetail, productData]);
  return (
    <Tab.Navigator
      screenOptions={{
        gestureEnable: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: 70,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="stocks"
        component={StockScreen}
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
              iconText={"TRNSCTN"}
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
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconSize={30}
              iconName={"user"}
              vectorIcon={"fontawesome"}
              iconText={"USER"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
