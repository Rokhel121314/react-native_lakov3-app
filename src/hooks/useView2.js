import { useState } from "react";

const useView2 = (initialValue = false) => {
  const [view2, setView2] = useState(initialValue);
  const toggleView2 = () => {
    setView2((prev) => !prev);
  };

  const toggleViewTrueOnly2 = () => {
    setView2(true);
  };

  const toggleViewFalseOnly2 = () => {
    setView2(false);
  };
  return { view2, toggleView2, toggleViewTrueOnly2, toggleViewFalseOnly2 };
};

export default useView2;
