import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { getAllProduct, unGetAllProduct } from "../redux/productSlice";

// STACK SCREENS
import LoginScreen from "../screens/stack-screen/LoginScreen";
import RegisterScreen from "../screens/stack-screen/RegisterScreen";
import AddProductScreen from "../screens/stack-screen/AddProductScreen";
import UpdateProductScreen from "../screens/stack-screen/UpdateProductScreen";
import ViewProductScreen from "../screens/stack-screen/ViewProductScreen";
import ViewTransactionScreen from "../screens/stack-screen/ViewTransactionScreen";

// TAB NAVIGATOR
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ navigation }) => {
  const { userData, isLoading } = useSelector((state) => state.user);
  // const { allProductData } = useSelector((state) => state.product);
  const { userInfo, getUserInfo } = useAsyncStorage();
  const { fireBaseAuthenticateUser } = useFirebaseAuth();

  const dispatch = useDispatch();
  // console.log("userID", userData?.user_id);
  // console.log("allProduct", allProductData);

  useEffect(() => {
    getUserInfo();
    fireBaseAuthenticateUser();
  }, [userData]);

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        color={"#fff"}
        style={{ flex: 1, backgroundColor: "#344c57" }}
      />
    );
  }
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="bottom-tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="add-product" component={AddProductScreen} />
      <Stack.Screen name="update-product" component={UpdateProductScreen} />
      <Stack.Screen
        name="view-product"
        component={ViewProductScreen}
        options={({ route }) => ({
          title: route.params.item.product_name.toUpperCase(),
        })}
      />
      <Stack.Screen name="view-transaction" component={ViewTransactionScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
