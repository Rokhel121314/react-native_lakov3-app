import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-dianne items-center justify-center">
      <StatusBar style="light" />
      <Image
        source={require("../../../assets/logo/logo.png")}
        style={{ width: 300 }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
