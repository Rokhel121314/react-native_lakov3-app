import { View, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

const DateFilter = ({ range, setOpen, startDate, endDate, defaultDate }) => {
  return (
    <View className="w-full flex-row justify-start items-center px-5 py-1 pb-3">
      <TextInput
        className="border border-blue-dianne py-.5 px-6 rounded-3xl text-blue-dianne mr-3 font-semibold"
        value={range.startDate ? startDate : defaultDate}
        editable={false}
      />
      <FontAwesome5 name="arrows-alt-h" size={16} color="#344c57" />
      <TextInput
        className="border border-blue-dianne py-.5 px-6 rounded-3xl text-blue-dianne ml-3 font-semibold"
        value={range.endDate ? endDate : defaultDate}
        editable={false}
      />
      <TouchableOpacity className="ml-6" onPress={() => setOpen(true)}>
        <MaterialIcons name="date-range" size={35} color="#344c57" />
      </TouchableOpacity>
    </View>
  );
};

export default DateFilter;
