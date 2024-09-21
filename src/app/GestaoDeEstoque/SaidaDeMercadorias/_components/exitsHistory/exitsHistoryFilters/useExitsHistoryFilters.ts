import { useState } from "react";

export const useExitsHistoryFilters = () => {
  const [date, setDate] = useState("");
  const [responsible, setResponsible] = useState("");
  const [requester, setRequester] = useState("");

  return {
    date,
    setDate,
    responsible,
    setResponsible,
    requester,
    setRequester,
  };
};
