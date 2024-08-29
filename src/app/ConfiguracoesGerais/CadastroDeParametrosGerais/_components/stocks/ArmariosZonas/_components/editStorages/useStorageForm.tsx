"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ArmarioZona } from "../../../../GeneralParametersData";
import {
  editStorageFormSchema,
  type EditStorageFormValues,
} from "./storageEditFormSchema";

export const useStorageForm = (armarioZona: ArmarioZona) => {
  const form = useForm<EditStorageFormValues>({
    resolver: zodResolver(editStorageFormSchema),
    mode: "onChange",
    defaultValues: {
      descricao: armarioZona.descricao,
    },
  });

  function onSubmitEdit(data: EditStorageFormValues) {
    console.log("Editando armário/zona:");
    console.log(JSON.stringify(data, null, 2)); // Editar armário/zona
  }

  function onSubmitRemove(data: EditStorageFormValues) {
    console.log("Removendo armário/zona:");
    console.log(JSON.stringify(data, null, 2)); // Remover armário/zona
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
