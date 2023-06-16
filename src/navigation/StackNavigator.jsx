import { createNativeStackNavigator } from "@react-navigation/native-stack";

// STACK SCREENS
import LoginScreen from "../screens/stack-screen/LoginScreen";
import RegisterScreen from "../screens/stack-screen/RegisterScreen";
import AddProductScreen from "../screens/stack-screen/AddProductScreen";
import UpdateProductScreen from "../screens/stack-screen/UpdateProductScreen";
import ViewProductScreen from "../screens/stack-screen/ViewProductScreen";
import ViewTransactionScreen from "../screens/stack-screen/ViewTransactionScreen";
import SplashScreen from "../screens/stack-screen/SplashScreen";

// TAB NAVIGATOR
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bottom-tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="add-product" component={AddProductScreen} />
      <Stack.Screen name="update-product" component={UpdateProductScreen} />
      <Stack.Screen name="view-product" component={ViewProductScreen} />
      <Stack.Screen name="view-transaction" component={ViewTransactionScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
