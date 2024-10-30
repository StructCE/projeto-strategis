import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type StockWithCabinets } from "~/server/interfaces/stock/stock.route.interfaces";
import { api } from "~/trpc/react";
import {
  editStockFormSchema,
  type EditStockFormValues,
} from "../editStocks/stockEditFormSchema";

export const useStockForm = (stock: StockWithCabinets) => {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

  const stockMutation = api.stock.editStock.useMutation({
    onSuccess: (updatedStock) => {
      // console.log("Stock updated successfully:", updatedStock);
      if (isDeleted === false) {
        toast.success(
          "Estoque atualizado com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
      }
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating stock:", error);
      toast.error("Erro ao atualizar estoque.", {
        position: "bottom-right",
      });
    },
  });

  const deleteStockMutation = api.stock.deleteStock.useMutation({
    onSuccess: (deletedStock) => {
      // console.log("Stock removed successfully:", deletedStock);
      toast.success("Estoque removido com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error removing stock:", error);
      toast.error("Erro ao remover estoque.", {
        position: "bottom-right",
      });
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
    // console.log(JSON.stringify(data, null, 2));

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
