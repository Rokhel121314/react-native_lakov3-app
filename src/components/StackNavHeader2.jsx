import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import BackButton2 from "./BackButton2";

const StackNavHeader2 = ({
  item,
  back,
  navigation,
  options,
  editButton,
  deleteButton,
  saveButton,
  title,
}) => {
  return (
    <View className="h-16 bg-gray-100 flex-row justify-center items-center">
      {back ? <BackButton2 navigation={navigation} /> : null}
      {title ? (
        <Text className="text-2xl font-bold text-blue-dianne">{title}</Text>
      ) : null}
    </View>
  );
};

export default StackNavHeader2;
