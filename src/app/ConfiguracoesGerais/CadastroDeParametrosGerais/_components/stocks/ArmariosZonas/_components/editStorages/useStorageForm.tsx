"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type ArmarioZona,
  type Local,
} from "../../../../GeneralParametersData";
import {
  editStorageFormSchema,
  type EditStorageFormValues,
} from "./storageEditFormSchema";

const findLocalByArmarioZona = (
  armarioZona: ArmarioZona,
  locais: Local[],
): Local | undefined => {
  return locais?.find((local) =>
    local.armariosZonas.some((az) => az.descricao === armarioZona.descricao),
  );
};

export const useStorageForm = (armarioZona: ArmarioZona, locais: Local[]) => {
  const local = findLocalByArmarioZona(armarioZona, locais);

  const form = useForm<EditStorageFormValues>({
    resolver: zodResolver(editStorageFormSchema),
    mode: "onChange",
    defaultValues: {
      local: local?.descricao,
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
