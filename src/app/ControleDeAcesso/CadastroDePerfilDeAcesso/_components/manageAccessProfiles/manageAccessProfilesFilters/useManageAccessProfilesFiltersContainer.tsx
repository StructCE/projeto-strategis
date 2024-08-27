import { useState } from "react";

export const useManageAccessProfilesFilters = () => {
  const [inputNome, setInputNome] = useState("");
  return {
    inputNome,
    setInputNome,
  };
};
