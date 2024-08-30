"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Shelf } from "../../../../GeneralParametersData";
import {
  editShelfFormSchema,
  type EditShelfFormValues,
} from "./shelvesEditFormSchema";

export const useShelfForm = (shelf: Shelf) => {
  const form = useForm<EditShelfFormValues>({
    resolver: zodResolver(editShelfFormSchema),
    mode: "onChange",
    defaultValues: {
      description: shelf.description,
    },
  });

  function onSubmitEdit(data: EditShelfFormValues) {
    console.log("Editando prateleira:");
    console.log(JSON.stringify(data, null, 2)); // Editar prateleira
  }

  function onSubmitRemove(data: EditShelfFormValues) {
    console.log("Removendo prateleira:");
    console.log(JSON.stringify(data, null, 2)); // Remover prateleira
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
