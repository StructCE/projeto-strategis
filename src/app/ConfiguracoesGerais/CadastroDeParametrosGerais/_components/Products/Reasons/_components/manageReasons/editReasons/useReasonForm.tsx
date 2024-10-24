import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          toast.success(
            "Motivo atualizado com sucesso. Atualizando a página...",
            {
              position: "bottom-right",
            },
          );
        }
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error updating reason:", error);
        toast.error("Erro ao atualizar motivo.", {
          position: "bottom-right",
        });
      },
    });

  const deleteReasonMutation =
    api.generalParameters.adjustReason.removeAdjustReason.useMutation({
      onSuccess: (deletedReason) => {
        console.log("Reason removed successfully:", deletedReason);
        toast.success("Motivo removido com sucesso. Atualizando a página...", {
          position: "bottom-right",
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error removing reason:", error);
        toast.error("Erro ao remover motivo.", {
          position: "bottom-right",
        });
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
