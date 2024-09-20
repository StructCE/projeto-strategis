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
      company: stock.company.map((company) => ({
        nameStockCompany: company.nameCompany,
        value: company.value,
      })),
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
