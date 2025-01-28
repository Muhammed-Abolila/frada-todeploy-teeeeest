"use client";
import { useState } from "react";
const ArrowHook = () => {
  const [height, setHeight] = useState("0px");
  const toggleArrow = () => {
    setHeight((prevHeight) => (prevHeight === "0px" ? "auto" : "0px"));
  };
  return [height, toggleArrow];
};
export default ArrowHook;
