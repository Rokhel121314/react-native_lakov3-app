import { View, Text } from "react-native";
import React from "react";

const Test = () => {
  const squareFunction = (number) => {
    let output = "";
    let splitNumber = number.toString().split("");

    let squaredDigit = splitNumber.map(
      (digit) => parseInt(digit) * parseInt(digit)
    );

    // for (let i = 0; i < squaredDigit.length; i++) {
    //   output += squaredDigit[i];
    // }
    output = squaredDigit.reduce((a, b) => a.toString() + b.toString());

    console.log("output", output, typeof parseInt(output));
  };

  squareFunction(1234);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Test;
