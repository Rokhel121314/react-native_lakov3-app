import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ModalScreen = ({ navigation, back }) => {
  const { isSavingProduct, productDetail } = useSelector(
    (state) => state.product
  );

  return (
    <View>
      <Text>ModalScreen</Text>
    </View>
  );
};

export default ModalScreen;
