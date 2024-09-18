import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  editStockFormSchema,
  type EditStockFormValues,
} from "../editStocks/stockEditFormSchema";
import { useFieldArray } from "react-hook-form";
import { type Stock } from "../stockData";

export const useStockForm = (stock: Stock) => {
  const form = useForm<EditStockFormValues>({
    resolver: zodResolver(editStockFormSchema),
    mode: "onChange",
    defaultValues: {
      code: stock.code,
      name: stock.name,
      company: stock.company,
      stockAddress: stock.stock_address,
      zone: stock.zone,
      shelf: stock.shelf,
      stockRepresentative: stock.responsable_stock.map(
        (stockRepresentative) => ({
          name: stockRepresentative.name,
          role: stockRepresentative.role.value,
          email: stockRepresentative.email,
          phone: stockRepresentative.phone,
        }),
      ),
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "stockRepresentative",
  });

  function onSubmitEdit(data: EditStockFormValues) {
    console.log("Editando fornecedor:");
    console.log(JSON.stringify(data, null, 2)); // Editar Estoque
  }

  return {
    form,
    onSubmitEdit,
    fieldsArray: fieldArray.fields,
    arrayRemove: fieldArray.remove,
  };
};
