import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
}
