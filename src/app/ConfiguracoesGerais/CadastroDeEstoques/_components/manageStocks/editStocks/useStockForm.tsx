import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { type Stock } from "../../stockData";
import {
  editStockFormSchema,
  type EditStockFormValues,
} from "../editStocks/stockEditFormSchema";

export const useStockForm = (stock: Stock) => {
  const form = useForm<EditStockFormValues>({
    resolver: zodResolver(editStockFormSchema),
    mode: "onChange",
    defaultValues: {
      name: stock.name,
      company: stock.company.name,
      stock_manager: stock.stock_manager.name,
      address: stock.address.map((address) => ({
        storage: address.description,
        shelves: address.shelves.map((shelf) => shelf.description),
      })),
    },
  });

  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);

  const fieldArray = useFieldArray({
    control: form.control,
    name: "address",
  });

  function onSubmitEdit(data: EditStockFormValues) {
    console.log("Editando Estoque:");
    console.log(JSON.stringify(data, null, 2)); // Editar Estoque
  }

  function onSubmitRemove(data: EditStockFormValues) {
    console.log("Removendo Estoque:");
    console.log(JSON.stringify(data, null, 2)); // Remover Estoque
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
    selectedStorages,
    setSelectedStorages,
    fieldsArray: fieldArray.fields,
    arrayRemove: fieldArray.remove,
    arrayAppend: fieldArray.append,
  };
};
