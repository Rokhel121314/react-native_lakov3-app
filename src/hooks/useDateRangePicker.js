import { useCallback, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const useDateRangePicker = () => {
  const [range, setRange] = useState({ startDate: null, endDate: null });
  const [open, setOpen] = useState(false);
  const { transactionList } = useSelector((state) => state.transaction);
  // console.log("transactionList", transactionList);

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
  const defaultStartDate = moment(transactionList[0].createdAt).format(
    "MM/DD/YYYY"
  );
  const defaultEndDate = moment(
    transactionList[transactionList.length - 1].createdAt
  ).format("MM/DD/YYYY");

  return {
    range,
    open,
    onDismiss,
    onConfirm,
    setOpen,
    startDate,
    endDate,
    defaultStartDate,
    defaultEndDate,
  };
};

export default useDateRangePicker;
