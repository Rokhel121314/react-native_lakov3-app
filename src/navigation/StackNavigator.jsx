import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

// STACK SCREENS
import LoginScreen from "../screens/stack-screen/LoginScreen";
import RegisterScreen from "../screens/stack-screen/RegisterScreen";
import AddProductScreen from "../screens/stack-screen/AddProductScreen";
import UpdateProductScreen from "../screens/stack-screen/UpdateProductScreen";
import ViewProductScreen from "../screens/stack-screen/ViewProductScreen";
import ViewTransactionScreen from "../screens/stack-screen/ViewTransactionScreen";
import CheckoutScreen from "../screens/stack-screen/CheckoutScreen";

// TAB NAVIGATOR
import TabNavigator from "./TabNavigator";
import StackNavHeader from "../components/StackNavHeader";
import StackNavHeader2 from "../components/StackNavHeader2";
import LoadingScreen from "../components/LoadingScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ navigation }) => {
  const { isLoading } = useSelector((state) => state.user);
  const { getUserInfo } = useAsyncStorage();
  const { fireBaseAuthenticateUser, uid } = useFirebaseAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    fireBaseAuthenticateUser().then(() => {
      if (uid === null) {
        navigation.navigate("login");
      }
      if (uid !== null) {
        getUserInfo();
      }
    });
  }, [uid]);

  if (isLoading) {
    return <LoadingScreen />;
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

      <Stack.Screen
        name="add-product"
        component={AddProductScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return (
              <StackNavHeader2
                back={back}
                navigation={navigation}
                options={options}
                title={`ADD PRODUCT`}
                editButton={false}
                deleteButton={false}
                saveButton={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="update-product"
        component={UpdateProductScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return (
              <StackNavHeader2
                item={route.params.item}
                back={back}
                navigation={navigation}
                options={options}
                title={`UPDATE PRODUCT`}
                editButton={false}
                deleteButton={false}
                saveButton={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="view-product"
        component={ViewProductScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return (
              <StackNavHeader
                item={route.params.item}
                back={back}
                navigation={navigation}
                options={options}
                editButton={true}
                deleteButton={true}
                saveButton={false}
                backDestination={"stocks"}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="view-transaction"
        component={ViewTransactionScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return (
              <StackNavHeader
                item={route.params.item}
                back={back}
                navigation={navigation}
                options={options}
                editButton={null}
                deleteButton={null}
                saveButton={false}
                backDestination={"transaction"}
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="checkout"
        component={CheckoutScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return (
              <StackNavHeader2
                back={back}
                navigation={navigation}
                options={options}
                title={`PAYMENT`}
                editButton={false}
                deleteButton={false}
                saveButton={false}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
