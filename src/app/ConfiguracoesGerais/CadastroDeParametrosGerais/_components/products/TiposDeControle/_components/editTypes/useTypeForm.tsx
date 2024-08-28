import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type TipoDeControle } from "../../../../GeneralParametersData";
import {
  editTypeFormSchema,
  type EditTypeFormValues,
} from "./typeEditFormSchema";

export const useTypeForm = (tipo: TipoDeControle) => {
  const form = useForm<EditTypeFormValues>({
    resolver: zodResolver(editTypeFormSchema),
    mode: "onChange",
    defaultValues: {
      descricao: tipo.descricao,
    },
  });

  function onSubmitEdit(data: EditTypeFormValues) {
    console.log("Editando categoria:");
    console.log(JSON.stringify(data, null, 2)); // Editar categoria
  }

  function onSubmitRemove(data: EditTypeFormValues) {
    console.log("Removendo categoria:");
    console.log(JSON.stringify(data, null, 2)); // Remover categoria
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
