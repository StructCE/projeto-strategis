import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type AdjustReason } from "~/server/interfaces/adjustReason/adjustReason.route.interfaces";
import { api } from "~/trpc/react";
import {
  editReasonFormSchema,
  type EditReasonFormValues,
} from "./reasonEditFormSchema";

export const useReasonForm = (reason: AdjustReason) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const reasonMutation =
    api.generalParameters.adjustReason.editAdjustReason.useMutation({
      onSuccess: (updatedReason) => {
        console.log("Reason updated successfully:", updatedReason);
        if (isDeleted === false) {
          alert("Motivo atualizado com sucesso.");
        }
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error updating reason:", error);
        alert("Erro ao atualizar motivo.");
      },
    });

  const deleteReasonMutation =
    api.generalParameters.adjustReason.removeAdjustReason.useMutation({
      onSuccess: (deletedReason) => {
        console.log("Reason removed successfully:", deletedReason);
        alert("Motivo removido com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error removing reason:", error);
        alert("Erro ao remover motivo.");
      },
    });

  const form = useForm<EditReasonFormValues>({
    resolver: zodResolver(editReasonFormSchema),
    mode: "onChange",
    defaultValues: {
      name: reason.name,
    },
  });

  function onSubmitEdit(data: EditReasonFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      reasonMutation.mutate({
        id: reason.id,
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteReasonMutation.mutate({
        id: reason.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
