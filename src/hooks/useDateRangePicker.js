import { View, Text } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import React, { useCallback, useState } from "react";
import moment from "moment";

const useDateRangePicker = () => {
  const [range, setRange] = useState({ startDate: null, endDate: null });
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  const startDate = moment(range.startDate).format("MM/DD/YYYY");
  const endDate = moment(range.endDate).format("MM/DD/YYYY");
  const defaultDate = moment(new Date()).format("MM/DD/YYYY");

  return {
    range,
    open,
    onDismiss,
    onConfirm,
    setOpen,
    startDate,
    endDate,
    defaultDate,
  };
};

export default useDateRangePicker;
