import { useState } from "react";

export const useDetailNFsInputs = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return {
    selectedValue,
    setSelectedValue,

  };
};
