import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type ControlType } from "~/server/interfaces/controlType/controlType.route.interfaces";
import { api } from "~/trpc/react";
import {
  editTypeFormSchema,
  type EditTypeFormValues,
} from "./typeEditFormSchema";

export const useTypeForm = (controlType: ControlType) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const controlTypeMutation =
    api.generalParameters.controlType.editControlType.useMutation({
      onSuccess: (updatedControlType) => {
        console.log("Control type updated successfully:", updatedControlType);
        if (isDeleted === false) {
          toast.success(
            "Tipo de controle atualizado com sucesso. Atualizando a página...",
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
        console.error("Error updating control type:", error);
        toast.error("Erro ao atualizar tipo de controle.", {
          position: "bottom-right",
        });
      },
    });

  const deleteControlTypeMutation =
    api.generalParameters.controlType.removeControlType.useMutation({
      onSuccess: (deletedControlType) => {
        console.log("Control type removed successfully:", deletedControlType);
        toast.success(
          "Tipo de controle removido com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error removing control type:", error);
        toast.error("Erro ao remover tipo de controle.", {
          position: "bottom-right",
        });
      },
    });

  const form = useForm<EditTypeFormValues>({
    resolver: zodResolver(editTypeFormSchema),
    mode: "onChange",
    defaultValues: {
      name: controlType.name,
    },
  });

  function onSubmitEdit(data: EditTypeFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      controlTypeMutation.mutate({
        id: controlType.id,
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
      deleteControlTypeMutation.mutate({
        id: controlType.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
