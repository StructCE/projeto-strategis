import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { type StockWithCabinets } from "~/server/interfaces/stock/stock.route.interfaces";
import { api } from "~/trpc/react";
import {
  editStockFormSchema,
  type EditStockFormValues,
} from "../editStocks/stockEditFormSchema";

export const useStockForm = (stock: StockWithCabinets) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const stockMutation = api.stock.editStock.useMutation({
    onSuccess: (updatedStock) => {
      console.log("Stock updated successfully:", updatedStock);
      if (isDeleted === false) {
        alert("Estoque atualizado com sucesso.");
      }
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating stock:", error);
      alert("Erro ao atualizar estoque.");
    },
  });

  const deleteStockMutation = api.stock.deleteStock.useMutation({
    onSuccess: (deletedStock) => {
      console.log("Stock removed successfully:", deletedStock);
      alert("Estoque removido com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error removing stock:", error);
      alert("Erro ao remover estoque.");
    },
  });

  const form = useForm<EditStockFormValues>({
    resolver: zodResolver(editStockFormSchema),
    mode: "onChange",
    defaultValues: {
      name: stock.name,
      companyId: stock.company.id,
      legalResponsibleId: stock.legalResponsible.userId,
      StockCabinet: stock.StockCabinet?.map((stockCabinet) => ({
        cabinetId: stockCabinet.cabinetId,
      })),
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "StockCabinet",
  });

  function onSubmitEdit(data: EditStockFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      stockMutation.mutate({
        id: stock.id,
        data: {
          name: data.name,
          companyId: data.companyId,
          legalResponsibleId: data.legalResponsibleId,
          StockCabinet:
            data.StockCabinet?.map((stockCabinet) => ({
              cabinetId: stockCabinet.cabinetId,
            })) ?? [],
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteStockMutation.mutate({
        id: stock.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
    fieldsArray: fieldArray.fields,
    arrayRemove: fieldArray.remove,
    arrayAppend: fieldArray.append,
  };
};
