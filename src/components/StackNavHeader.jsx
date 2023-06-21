import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import BackButton from "./BackButton";

const StackNavHeader = ({ title, back, navigation, options }) => {
  return (
    <View className="h-16 bg-gray-100 flex-row justify-between items-center">
      {back ? <BackButton navigation={navigation} /> : null}
      <View className="flex-row mr-4 gap-3">
        <TouchableOpacity
          className="bg-blue-dianne rounded-xl justify-items-center"
          onPress={() => navigation.navigate("update-product")}>
          <Text className="px-2 py-1 text-gray-50">EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-dianne rounded-xl justify-items-center">
          <Text className="px-2 py-1 text-gray-50">DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StackNavHeader;
