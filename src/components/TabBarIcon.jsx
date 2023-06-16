import { View, Text } from "react-native";
import React from "react";

import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const TabBarIcon = ({ focused, iconSize, iconName, iconText, vectorIcon }) => {
  if (vectorIcon === "fontisto") {
    return (
      <View className="flex items-center justify-center">
        <Fontisto
          name={iconName}
          size={iconSize}
          color={focused ? "#344C57" : "rgb(209 213 219)"}
        />
        <Text
          className={
            focused
              ? "text-blue-dianne font-bold text-xs pt-1.5"
              : "text-gray-300 font-bold text-xs pt-1.5"
          }>
          {iconText}
        </Text>
      </View>
    );
  }
  if (vectorIcon === "fontawesome") {
    return (
      <View className="flex items-center justify-center">
        <FontAwesome
          name={iconName}
          size={iconSize}
          color={focused ? "#344C57" : "rgb(209 213 219)"}
        />
        <Text
          className={
            focused
              ? "text-blue-dianne font-bold text-xs pt-1.5"
              : "text-gray-300 font-bold text-xs pt-1.5"
          }>
          {iconText}
        </Text>
      </View>
    );
  }
  if (vectorIcon === "simplelineicon") {
    return (
      <View className="flex items-center justify-center">
        <SimpleLineIcons
          name={iconName}
          size={iconSize}
          color={focused ? "#344C57" : "rgb(209 213 219)"}
        />
        <Text
          className={
            focused
              ? "text-blue-dianne font-bold text-xs pt-1.5"
              : "text-gray-300 font-bold text-xs pt-1.5"
          }>
          {iconText}
        </Text>
      </View>
    );
  }
};

export default TabBarIcon;
