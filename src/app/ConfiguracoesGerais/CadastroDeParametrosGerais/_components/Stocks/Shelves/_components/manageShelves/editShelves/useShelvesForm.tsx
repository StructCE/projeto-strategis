"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type Shelf } from "~/server/interfaces/cabinet/cabinet.route.interfaces";
import { api } from "~/trpc/react";
import {
  editShelfFormSchema,
  type EditShelfFormValues,
} from "./shelvesEditFormSchema";

export const useShelfForm = (shelf: Shelf) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const shelfMutation = api.generalParameters.shelf.editShelf.useMutation({
    onSuccess: (updatedShelf) => {
      console.log("Shelf updated successfully:", updatedShelf);
      if (isDeleted === false) {
        alert("Prateleira atualizada com sucesso.");
      }
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating shelf:", error);
      alert("Erro ao atualizar prateleira.");
    },
  });

  const deleteShelfMutation =
    api.generalParameters.shelf.removeShelf.useMutation({
      onSuccess: (deletedShelf) => {
        console.log("Shelf removed successfully:", deletedShelf);
        alert("Prateleira removida com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error removing shelf:", error);
        alert("Erro ao remover prateleira.");
      },
    });

  const form = useForm<EditShelfFormValues>({
    resolver: zodResolver(editShelfFormSchema),
    mode: "onChange",
    defaultValues: {
      name: shelf.name,
    },
  });

  function onSubmitEdit(data: EditShelfFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      shelfMutation.mutate({
        id: shelf.id,
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
      deleteShelfMutation.mutate({
        id: shelf.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
