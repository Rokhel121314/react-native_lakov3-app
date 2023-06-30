import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import useToggle from "../hooks/useToggle";

const SortButton = ({
  sortAscending,
  sortDescending,
  sortName,
  view,
  toggleView1,
  toggleView2,
  toggleView3,
  style,
}) => {
  const dispatch = useDispatch();
  const { value, toggle } = useToggle();
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      {value ? (
        <TouchableOpacity
          disabled={disabled}
          className={style}
          onPress={() => {
            dispatch(sortAscending());
            toggle();
            toggleView1();
            toggleView2();
            toggleView3();
            setDisabled(true);
            setTimeout(() => {
              setDisabled(false);
            }, 4000);
          }}>
          <Text className="text-md text-blue-dianne font-semibold mr-1">
            {sortName}
          </Text>
          {view ? <AntDesign name="arrowup" size={15} color="black" /> : null}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          className={style}
          onPress={() => {
            dispatch(sortDescending());
            toggle();
            toggleView1();
            toggleView2();
            toggleView3();
            setDisabled(true);
            setTimeout(() => {
              setDisabled(false);
            }, 4000);
          }}>
          <Text className="text-md text-blue-dianne font-semibold mr-1">
            {sortName}
          </Text>
          {view ? <AntDesign name="arrowdown" size={15} color="black" /> : null}
        </TouchableOpacity>
      )}
    </>
  );
};

export default SortButton;
