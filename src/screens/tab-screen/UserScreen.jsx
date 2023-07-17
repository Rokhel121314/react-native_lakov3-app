import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../../components/LogoutButton";

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  console.log("userData", userData);
  return (
    <SafeAreaView className="flex-1 mb-[70px] px-6">
      <View className="px-6 flex-2">
        <Image
          source={{ uri: userData.store_logo }}
          style={{ width: "100%", height: 200, resizeMode: "contain" }}
        />
      </View>
      <View className="flex-1  border-b border-blue-dianne justify-end">
        <Text className="text-lg text-gray-400 font-normal">STORE NAME</Text>
        <Text className="text-2xl text-blue-dianne font-bold">
          {userData.store_name}
        </Text>
      </View>

      <View className="flex-1  border-b border-blue-dianne justify-end">
        <Text className="text-lg text-gray-400 font-normal">EMAIL</Text>
        <Text className="text-2xl text-blue-dianne font-bold">
          {userData.user_name}
        </Text>
      </View>

      <View className="flex-1  border-b border-blue-dianne justify-end">
        <Text className="text-lg text-gray-400 font-normal">PASSWORD</Text>
        <Text className="text-2xl text-blue-dianne font-bold">***********</Text>
      </View>

      <View className="flex-2 justify-end items-center mb-6">
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
