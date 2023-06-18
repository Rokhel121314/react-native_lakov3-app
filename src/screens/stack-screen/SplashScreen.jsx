import { SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import SvgComponent from "../../components/SvgComponent";

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-dianne items-center justify-center">
      <StatusBar style="light" />
      <SvgComponent />
    </SafeAreaView>
  );
};

export default SplashScreen;
