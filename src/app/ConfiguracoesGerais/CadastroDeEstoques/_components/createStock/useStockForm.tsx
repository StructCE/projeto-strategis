import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createStockFormSchema,
  type CreateStockFormValues,
} from "./stockRegisterFormSchema";

export const useStockForm = () => {
  const stockMutation = api.stock.registerStock.useMutation({
    onSuccess: (newStock) => {
      console.log("Stock created successfully:", newStock);
      toast.success("Estoque criado com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating stock:", error);
      toast.error("Erro ao criar estoque.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<CreateStockFormValues>({
    resolver: zodResolver(createStockFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      companyId: "",
      legalResponsibleId: "",
      StockCabinet: [{ cabinetId: "" }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "StockCabinet",
  });

  function onSubmit(data: CreateStockFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const stockData = {
      name: data.name,
      companyId: data.companyId,
      legalResponsibleId: data.legalResponsibleId,
      StockCabinet:
        data.StockCabinet?.map((stockCabinet) => ({
          cabinetId: stockCabinet.cabinetId,
        })) ?? [],
    };

    try {
      stockMutation.mutate({
        ...stockData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return {
    form,
    onSubmit,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
