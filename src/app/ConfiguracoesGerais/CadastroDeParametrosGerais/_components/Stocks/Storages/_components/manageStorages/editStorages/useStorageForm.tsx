"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type Cabinet } from "~/server/interfaces/cabinet/cabinet.route.interfaces";
import { api } from "~/trpc/react";
import {
  editStorageFormSchema,
  type EditStorageFormValues,
} from "./storageEditFormSchema";

export const useStorageForm = (cabinet: Cabinet) => {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

  const cabinetMutation = api.generalParameters.cabinet.editCabinet.useMutation(
    {
      onSuccess: (updatedCabinet) => {
        // console.log("Cabinet updated successfully:", updatedCabinet);
        if (isDeleted === false) {
          toast.success(
            "Armário/zona atualizado com sucesso. Atualizando a página...",
            {
              position: "bottom-right",
            },
          );
        }
        setTimeout(() => {
          router.refresh();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error updating cabinet:", error);
        toast.error("Erro ao atualizar armário/zona.", {
          position: "bottom-right",
        });
      },
    },
  );

  const deleteCabinetMutation =
    api.generalParameters.cabinet.removeCabinet.useMutation({
      onSuccess: (deletedCabinet) => {
        // console.log("Cabinet removed successfully:", deletedCabinet);
        toast.success(
          "Armário/zona removido com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
        setTimeout(() => {
          router.refresh();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error removing cabinet:", error);
        toast.error("Erro ao remover armário/zona.", {
          position: "bottom-right",
        });
      },
    });

  const form = useForm<EditStorageFormValues>({
    resolver: zodResolver(editStorageFormSchema),
    mode: "onChange",
    defaultValues: {
      name: cabinet.name,
    },
  });

  function onSubmitEdit(data: EditStorageFormValues) {
    if (isDeleted) return;
    // console.log(JSON.stringify(data, null, 2));

    try {
      cabinetMutation.mutate({
        id: cabinet.id,
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
      deleteCabinetMutation.mutate({
        id: cabinet.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
