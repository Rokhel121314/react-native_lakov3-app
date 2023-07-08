import { View, Text, ScrollView } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

const BezierLineChart = ({ salesDataByDate }) => {
  const labels = salesDataByDate.map((date) =>
    date.transaction_date.slice(0, 5)
  );

  const data = salesDataByDate.map((amount) => amount.sales_total_amount);

  return (
    <ScrollView
      horizontal={true}
      className="overflow-auto w-full h-[400px] bg-[#344c57] my-2 rounded-2xl">
      <FlashMessage duration={2000} />
      <LineChart
        onDataPointClick={({ value, getColor }) => {
          showMessage({
            message: `$ ${value.toFixed(2)}`,
            description: "sales on this date",
            type: "success",
            backgroundColor: "#9F89AB", // background color
            color: "#fff", // text color
          });
        }}
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get("window").width - 48} // from react-native
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
  );
};

export default BezierLineChart;
