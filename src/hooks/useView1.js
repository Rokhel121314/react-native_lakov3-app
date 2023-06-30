import { useState } from "react";

const useView1 = (initialValue = false) => {
  const [view1, setView1] = useState(initialValue);
  const toggleView1 = () => {
    setView1((prev) => !prev);
  };

  const toggleViewTrueOnly1 = () => {
    setView1(true);
  };

  const toggleViewFalseOnly1 = () => {
    setView1(false);
  };
  return { view1, toggleView1, toggleViewTrueOnly1, toggleViewFalseOnly1 };
};

export default useView1;
