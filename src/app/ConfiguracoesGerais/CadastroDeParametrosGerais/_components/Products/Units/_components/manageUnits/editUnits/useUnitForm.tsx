import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type Unit } from "~/server/interfaces/unit/unit.route.interfaces";
import { api } from "~/trpc/react";
import {
  editUnitFormSchema,
  type EditUnitFormValues,
} from "./unitEditFormSchema";

export const useUnitForm = (unit: Unit) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const unitMutation = api.generalParameters.unit.editUnit.useMutation({
    onSuccess: (updatedUnit) => {
      console.log("Unit updated successfully:", updatedUnit);
      if (isDeleted === false) {
        toast.success(
          "Unidade atualizada com sucesso. Atualizando a página...",
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
      console.error("Error updating unit:", error);
      toast.error("Erro ao atualizar a unidade.", {
        position: "bottom-right",
      });
    },
  });

  const deleteUnitMutation = api.generalParameters.unit.removeUnit.useMutation({
    onSuccess: (deletedUnit) => {
      console.log("Unit removed successfully:", deletedUnit);
      toast.success("Unidade removida com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error removing unit:", error);
      toast.error("Erro ao remover a unidade.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<EditUnitFormValues>({
    resolver: zodResolver(editUnitFormSchema),
    mode: "onChange",
    defaultValues: {
      name: unit.name,
      abbreviation: unit.abbreviation,
      unitsPerPack: unit.unitsPerPack,
    },
  });

  function onSubmitEdit(data: EditUnitFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      unitMutation.mutate({
        id: unit.id,
        data: {
          name: data.name,
          abbreviation: data.abbreviation,
          unitsPerPack: data.unitsPerPack,
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteUnitMutation.mutate({
        id: unit.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
