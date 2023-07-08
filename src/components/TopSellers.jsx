import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const TopSellers = ({ title, sortedSalesData, salesProperty }) => {
  //

  const [sliceLenght, setSlicLength] = useState(5);
  const { allProductData } = useSelector((state) => state.product);

  return (
    <View className="w-full p-6 bg-blue-dianne rounded-lg">
      <Text className="text-gray-50 font-medium text-lg">{title}</Text>
      <View>
        {!sortedSalesData
          ? null
          : sortedSalesData.slice(0, sliceLenght).map((item) => {
              return (
                <View
                  className="flex-row justify-between"
                  key={item.product_id}>
                  <Text className="text-gray-50 font-extralight text-base">
                    {item.product_name?.toLowerCase()}
                  </Text>
                  <Text className="text-gray-50 font-extralight text-base">
                    {`${item[salesProperty].toFixed(2)} %`}
                  </Text>
                </View>
              );
            })}
      </View>
      <TouchableOpacity
        className="w-full items-end mt-1 "
        onPress={() => {
          sliceLenght === 5
            ? setSlicLength(allProductData.length)
            : setSlicLength(5);
        }}>
        {sliceLenght === 5 ? (
          <Text className="text-gray-50 underline">view all...</Text>
        ) : (
          <Text className="text-gray-50 underline">view less...</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TopSellers;
