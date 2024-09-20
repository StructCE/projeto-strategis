import { zodResolver } from "@hookform/resolvers/zod";
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
      code: stock.code,
      name: stock.name,
      company: stock.company.nameCompany,
      stockAddress: stock.stock_address.map((stock_Address) => ({
        nameStockAddress: stock_Address.nameAddress,
        value: stock_Address.value,
      })),
      zone: stock.zone.map((zone) => ({
        nameZone: zone.nameZone,
        value: zone.value,
      })),
      shelf: stock.shelf.map((shelf) => ({
        nameShelf: shelf.nameShelf,
        value: shelf.value,
      })),
      stockRepresentative: {
        name: stock.responsible_stock.name,
        role: stock.responsible_stock.role.value,
        email: stock.responsible_stock.email,
        phone: stock.responsible_stock.phone,
      },
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "stockAddress",
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
    fieldsArray: fieldArray.fields,
    arrayRemove: fieldArray.remove,
  };
};
