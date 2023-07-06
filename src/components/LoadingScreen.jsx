import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-dianne">
      <Image
        source={require("../../assets/logo/logo.png")}
        style={{ width: 270, height: 85, marginBottom: 20 }}
      />
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default LoadingScreen;
