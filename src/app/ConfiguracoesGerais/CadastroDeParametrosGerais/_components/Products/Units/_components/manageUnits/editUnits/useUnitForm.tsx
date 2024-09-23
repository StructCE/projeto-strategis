import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Unit } from "../../../../../GeneralParametersData";
import {
  editUnitFormSchema,
  type EditUnitFormValues,
} from "./unitEditFormSchema";

export const useUnitForm = (unit: Unit) => {
  const form = useForm<EditUnitFormValues>({
    resolver: zodResolver(editUnitFormSchema),
    mode: "onChange",
    defaultValues: {
      description: unit.description,
      abbreviation: unit.abbreviation,
      unitsPerPack: unit.unitsPerPack,
    },
  });

  function onSubmitEdit(data: EditUnitFormValues) {
    console.log("Editando unidade:");
    console.log(JSON.stringify(data, null, 2)); // Editar unidade
  }

  function onSubmitRemove(data: EditUnitFormValues) {
    console.log("Removendo unidade:");
    console.log(JSON.stringify(data, null, 2)); // Remover unidade
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
