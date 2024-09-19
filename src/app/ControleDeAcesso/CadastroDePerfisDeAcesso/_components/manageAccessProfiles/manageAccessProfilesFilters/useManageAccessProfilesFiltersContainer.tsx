import { useState } from "react";

export const useManageAccessProfilesFilters = () => {
  const [inputName, setInputName] = useState("");
  return {
    inputName,
    setInputName,
  };
};
