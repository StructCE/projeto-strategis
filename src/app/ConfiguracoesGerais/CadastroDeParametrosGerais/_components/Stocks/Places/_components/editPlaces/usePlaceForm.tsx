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
      descricao: local.descricao,
    },
  });

  function onSubmitEdit(data: EditPlaceFormValues) {
    console.log("Editando local:");
    console.log(JSON.stringify(data, null, 2)); // Editar local
  }

  function onSubmitRemove(data: EditPlaceFormValues) {
    console.log("Removendo local:");
    console.log(JSON.stringify(data, null, 2)); // Remover local
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
