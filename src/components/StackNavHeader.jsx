import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import BackButton from "./BackButton";

const StackNavHeader = ({
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
    <View className="h-16 bg-gray-100 flex-row justify-between items-center">
      {back ? <BackButton navigation={navigation} /> : null}
      {title ? (
        <Text className="text-2xl font-bold text-blue-dianne place-self-center">
          {title}
        </Text>
      ) : null}
      <View className="flex-row mr-4 gap-3">
        {editButton ? (
          <TouchableOpacity
            className="bg-blue-dianne rounded-xl justify-items-center"
            onPress={() => navigation.navigate("update-product", { item })}>
            <Text className="px-2 py-1 text-gray-50">EDIT</Text>
          </TouchableOpacity>
        ) : null}
        {deleteButton ? (
          <TouchableOpacity className="bg-blue-dianne rounded-xl justify-items-center">
            <Text className="px-2 py-1 text-gray-50">DELETE</Text>
          </TouchableOpacity>
        ) : null}
        {saveButton ? (
          <TouchableOpacity className="bg-blue-dianne rounded-xl justify-items-center">
            <Text className="px-2 py-1 text-gray-50">SAVE</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default StackNavHeader;
