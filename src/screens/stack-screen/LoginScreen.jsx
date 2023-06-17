import {
  StatusBar,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import SvgComponent from "../../components/SvgComponent";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView className="flex-1 bg-blue-dianne">
      <StatusBar backgroundColor={"#344c57"} />
      <View className="flex-2 w-full items-center justify-center">
        <SvgComponent />
      </View>
      <View className="flex-4 items-center">
        <TextInput
          placeholder="EMAIL"
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl"
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry={true}
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl mt-5"
        />
        <TouchableOpacity className="mt-10 w-4/5">
          <Text className="bg-gray-50 py-2 text-center text-blue-dianne font-bold tracking-wide text-lg rounded-3xl">
            SIGN IN
          </Text>
        </TouchableOpacity>

        <View>
          <Text className="text-gray-50 my-10">OR</Text>
        </View>

        <TouchableOpacity className="w-4/5">
          <View className="flex-row items-center justify-center bg-gray-50 py-2 rounded-3xl">
            <AntDesign name="google" size={24} color="#344c57" />
            <Text className="px-2 font-bold text-lg text-blue-dianne">
              Sign in with Google
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-4/5 mt-5">
          <View className="flex-row items-center justify-center bg-gray-50 py-2 rounded-3xl">
            <AntDesign name="apple1" size={24} color="#344c57" />
            <Text className="px-2 font-bold text-lg text-blue-dianne">
              Sign in with Apple
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row mt-2">
          <Text className="text-gray-50">Dont have an account?</Text>
          <Pressable onPress={() => navigation.navigate("register")}>
            <Text className="text-gray-50 underline decoration-2 px-1">
              Register here
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
