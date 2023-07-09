import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

const BezierLineChart = ({ salesDataByDate }) => {
  const labels = salesDataByDate.map((date) => date.transaction_date);
  const slicedLabels = salesDataByDate.map((date) =>
    date.transaction_date.slice(0, 5)
  );
  const data = salesDataByDate.map((amount) => amount.sales_total_amount);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseWidth = Dimensions.get("window").width - 48;
  const expandedWidth = labels.length * 30;

  return (
    <View className=" w-full bg-blue-dianne rounded-2xl mb-4">
      <View className="w-full h-10 items-end justify-center px-6 ">
        <TouchableOpacity
          className="bg-[#9F89AB]  rounded-lg mt-3"
          onPress={() => setIsCollapsed(!isCollapsed)}>
          <Text className="text-gray-50 px-2 py-1">
            {isCollapsed ? "EXPAND" : "COLLAPSE"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage duration={2000} />
      <ScrollView
        horizontal={isCollapsed ? false : true}
        className="overflow-auto w-full h-[400px] bg-[#344c57]  rounded-2xl">
        <FlashMessage duration={2000} />
        <LineChart
          onDataPointClick={({ value, index }) => {
            showMessage({
              message: `SALES: $ ${value.toFixed(2)}`,
              description: `Date: ${labels[index]}`,
              type: "success",
              backgroundColor: "#9F89AB", // background color
              color: "#fff", // text color
            });
          }}
          data={{
            labels: slicedLabels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          // width={Dimensions.get("window").width - 48}
          width={isCollapsed ? collapseWidth : expandedWidth}
          height={350}
          yAxisLabel={"$ "}
          verticalLabelRotation={90}
          yLabelsOffset={10}
          xLabelsOffset={0}
          segments={5}
          fromZero={true}
          chartConfig={{
            backgroundColor: "#344c57",
            backgroundGradientFrom: "#344c57",
            backgroundGradientTo: "#344c57",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              paddingRight: 20,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#9F89AB",
            },
          }}
          bezier
          style={{
            paddingVertical: 25,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default BezierLineChart;
