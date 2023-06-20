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
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const RegisterScreen = ({ navigation }) => {
  const { formData, setFormData, fireBaseRegister } = useFirebaseAuth();
  // console.log("formData", formData);
  return (
    <KeyboardAvoidingView className="flex-1 bg-blue-dianne">
      <StatusBar backgroundColor={"#344c57"} />
      <View className="flex-1 w-full items-center justify-center">
        <SvgComponent />
      </View>
      <View className="flex-4 items-center">
        <TextInput
          placeholder="FIRST NAME"
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl"
          value={formData.first_name}
          onChangeText={(text) =>
            setFormData({ ...formData, first_name: text })
          }
        />
        <TextInput
          placeholder="LAST NAME"
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl mt-5"
          value={formData.last_name}
          onChangeText={(text) => setFormData({ ...formData, last_name: text })}
        />
        <TextInput
          placeholder="STORE NAME"
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl mt-5"
          value={formData.store_name}
          onChangeText={(text) =>
            setFormData({ ...formData, store_name: text })
          }
        />
        <TextInput
          placeholder="EMAIL"
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl mt-5"
          value={formData.user_name}
          onChangeText={(text) => setFormData({ ...formData, user_name: text })}
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry={true}
          className="bg-gray-50 w-4/5 py-2 px-5 rounded-3xl mt-5"
          value={formData.user_password}
          onChangeText={(text) =>
            setFormData({ ...formData, user_password: text })
          }
        />
        <TouchableOpacity
          className="mt-10 w-4/5"
          onPress={() => fireBaseRegister()}>
          <Text className="bg-gray-50 py-2 text-center text-blue-dianne font-bold tracking-wide text-lg rounded-3xl">
            SIGN UP
          </Text>
        </TouchableOpacity>

        <View>
          <Text className="text-gray-50 my-7">OR</Text>
        </View>

        <TouchableOpacity className="w-4/5">
          <View className="flex-row items-center justify-center bg-gray-50 py-2 rounded-3xl">
            <AntDesign name="google" size={24} color="#344c57" />
            <Text className="px-2 font-bold text-lg text-blue-dianne">
              Sign up with Google
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-4/5 mt-5">
          <View className="flex-row items-center justify-center bg-gray-50 py-2 rounded-3xl">
            <AntDesign name="apple1" size={24} color="#344c57" />
            <Text className="px-2 font-bold text-lg text-blue-dianne">
              Sign up with Apple
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row mt-2">
          <Text className="text-gray-50">Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text className="text-gray-50 underline decoration-2 px-1">
              Log in here
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
