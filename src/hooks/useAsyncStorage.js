import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        setUserInfo(JSON.parse(user));
      } else if (user === null) {
        setUserInfo(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeUserInfo = async () => {
    try {
      await AsyncStorage.removeItem("user");
      return true;
    } catch (exception) {
      return false;
    }
  };

  return { removeUserInfo, getUserInfo, userInfo };
};
