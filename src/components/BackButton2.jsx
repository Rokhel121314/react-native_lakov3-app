import { TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const BackButton2 = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="ml-3 items-center justify-center rounded-md absolute left-1"
      onPress={navigation.goBack}>
      <Ionicons
        name="arrow-back"
        size={37}
        color="#344c57"
        style={{ padding: 3 }}
      />
    </TouchableOpacity>
  );
};

export default BackButton2;
