import { useState } from "react";

export const useManageUsersFilters = () => {
  const [inputName, setInputName] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectRole, setSelectRole] = useState("");

  return {
    inputName,
    setInputName,
    selectCompany,
    setSelectCompany,
    selectRole,
    setSelectRole,
  };
};
