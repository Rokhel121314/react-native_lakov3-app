import { useState } from "react";

const useView3 = (initialValue = true) => {
  const [view3, setView3] = useState(initialValue);
  const toggleView3 = () => {
    setView3((prev) => !prev);
  };

  const toggleViewTrueOnly3 = () => {
    setView3(true);
  };

  const toggleViewFalseOnly3 = () => {
    setView3(false);
  };
  return { view3, toggleView3, toggleViewTrueOnly3, toggleViewFalseOnly3 };
};

export default useView3;
