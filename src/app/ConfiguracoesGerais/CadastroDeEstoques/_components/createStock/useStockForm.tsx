import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  createStockFormSchema,
  type CreateStockFormValues,
} from "./stockRegisterFormSchema";

export const useStockForm = () => {
  const form = useForm<CreateStockFormValues>({
    resolver: zodResolver(createStockFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      stock_representative: { name: "", role: "", email: "", phone: "" },
      address: [{ storage: "", shelves: [] }],
    },
  });

  const [selectedStorages, setSelectedStorages] = useState<string[]>([]); // Armazenar os storages selecionados

  const fieldArray = useFieldArray({
    control: form.control,
    name: "address",
  });

  function onSubmit(data: CreateStockFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar estoque
  }

  return {
    form,
    onSubmit,
    selectedStorages,
    setSelectedStorages,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
