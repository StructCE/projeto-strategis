import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Local } from "../../../../GeneralParametersData";
import {
  editPlaceFormSchema,
  type EditPlaceFormValues,
} from "./placeEditFormSchema";

export const usePlaceForm = (local: Local) => {
  const form = useForm<EditPlaceFormValues>({
    resolver: zodResolver(editPlaceFormSchema),
    mode: "onChange",
    defaultValues: {
      local: local.descricao,
      // armarioZona: armarioZona.descricao,
      // prateleira: prateleira.descricao,
    },
  });

  function onSubmitEdit(data: EditPlaceFormValues) {
    console.log("Editando categoria:");
    console.log(JSON.stringify(data, null, 2)); // Editar categoria
  }

  function onSubmitRemove(data: EditPlaceFormValues) {
    console.log("Removendo categoria:");
    console.log(JSON.stringify(data, null, 2)); // Remover categoria
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
