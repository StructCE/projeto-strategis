import { useState } from "react";

export const useTableNFsFilters = () => {
  const [inputName, setInputName] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [dateBegin, setDateBegin] = useState<Date | undefined>(undefined);
  const [openDatePickerBegin, setOpenDatePickerBegin] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);
  const [openDatePickerEnd, setOpenDatePickerEnd] = useState(false);

  return {
    inputName,
    setInputName,
    selectCompany,
    setSelectCompany,
    selectRole,
    setSelectRole,
    dateBegin,
    setDateBegin,
    openDatePickerBegin,
    setOpenDatePickerBegin,
    dateEnd,
    setDateEnd,
    openDatePickerEnd,
    setOpenDatePickerEnd,
  };
};
