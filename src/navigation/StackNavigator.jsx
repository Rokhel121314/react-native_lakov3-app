import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { getAllProduct, unGetAllProduct } from "../redux/productSlice";
import { getHeaderTitle } from "@react-navigation/elements";

// STACK SCREENS
import LoginScreen from "../screens/stack-screen/LoginScreen";
import RegisterScreen from "../screens/stack-screen/RegisterScreen";
import AddProductScreen from "../screens/stack-screen/AddProductScreen";
import UpdateProductScreen from "../screens/stack-screen/UpdateProductScreen";
import ViewProductScreen from "../screens/stack-screen/ViewProductScreen";
import ViewTransactionScreen from "../screens/stack-screen/ViewTransactionScreen";

// TAB NAVIGATOR
import TabNavigator from "./TabNavigator";
import StackNavHeader from "../components/StackNavHeader";
import StackNavHeader2 from "../components/StackNavHeader2";
import ModalScreen from "../screens/stack-screen/ModalScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ navigation }) => {
  const { userData, isLoading } = useSelector((state) => state.user);
  const { userInfo, getUserInfo } = useAsyncStorage();
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
              />
            );
          },
        }}
      />
      <Stack.Screen name="view-transaction" component={ViewTransactionScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
