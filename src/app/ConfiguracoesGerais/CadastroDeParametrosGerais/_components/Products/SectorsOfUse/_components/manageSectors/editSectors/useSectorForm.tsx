import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type UseSector } from "~/server/interfaces/useSector/useSector.route.interfaces";
import { api } from "~/trpc/react";
import {
  editSectorFormSchema,
  type EditSectorFormValues,
} from "./sectorEditFormSchema";

export const useSectorForm = (sector: UseSector) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const sectorMutation =
    api.generalParameters.useSector.editUseSector.useMutation({
      onSuccess: (updatedSector) => {
        console.log("Sector updated successfully:", updatedSector);
        if (isDeleted === false) {
          alert("Setor atualizado com sucesso.");
        }
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error updating sector:", error);
        alert("Erro ao atualizar setor.");
      },
    });

  const deleteSectorMutation =
    api.generalParameters.useSector.removeUseSector.useMutation({
      onSuccess: (deletedSector) => {
        console.log("Sector removed successfully:", deletedSector);
        alert("Setor removido com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error removing sector:", error);
        alert("Erro ao remover setor.");
      },
    });

  const form = useForm<EditSectorFormValues>({
    resolver: zodResolver(editSectorFormSchema),
    mode: "onChange",
    defaultValues: {
      name: sector.name,
    },
  });

  function onSubmitEdit(data: EditSectorFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      sectorMutation.mutate({
        id: sector.id,
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
      deleteSectorMutation.mutate({
        id: sector.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
