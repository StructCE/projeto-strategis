import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type AdjustmentReason } from "../../../../../GeneralParametersData";
import {
  editReasonFormSchema,
  type EditReasonFormValues,
} from "./reasonEditFormSchema";

export const useReasonForm = (reason: AdjustmentReason) => {
  const form = useForm<EditReasonFormValues>({
    resolver: zodResolver(editReasonFormSchema),
    mode: "onChange",
    defaultValues: {
      description: reason.description,
    },
  });

  function onSubmitEdit(data: EditReasonFormValues) {
    console.log("Editando motivo:");
    console.log(JSON.stringify(data, null, 2)); // Editar motivo
  }

  function onSubmitRemove(data: EditReasonFormValues) {
    console.log("Removendo motivo:");
    console.log(JSON.stringify(data, null, 2)); // Remover motivo
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
