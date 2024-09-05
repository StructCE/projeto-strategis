import { useState } from "react";

export const useManageUsersFilters = () => {
  const [inputNome, setInputNome] = useState("");
  const [selectEmpresa, setSelectEmpresa] = useState("");
  const [selectCargo, setSelectCargo] = useState("");

  return {
    inputNome,
    setInputNome,
    selectEmpresa,
    setSelectEmpresa,
    selectCargo,
    setSelectCargo,
  };
};
