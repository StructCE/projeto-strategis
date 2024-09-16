import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type TypeOfControl } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editTypeFormSchema,
  type EditTypeFormValues,
} from "./typeEditFormSchema";

export const useTypeForm = (type: TypeOfControl) => {
  const form = useForm<EditTypeFormValues>({
    resolver: zodResolver(editTypeFormSchema),
    mode: "onChange",
    defaultValues: {
      description: type.description,
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
