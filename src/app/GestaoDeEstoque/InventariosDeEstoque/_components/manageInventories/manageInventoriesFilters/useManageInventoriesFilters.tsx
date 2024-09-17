import { useState } from "react";

export const useManageInventoriesFilters = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  return {
    date,
    setDate,
    open,
    setOpen,
    inputResponsible,
    setInputResponsible,
  };
};
