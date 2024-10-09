import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Group } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editGroupFormSchema,
  type EditGroupFormValues,
} from "./groupEditFormSchema";

export const useGroupForm = (group: Group) => {
  const form = useForm<EditGroupFormValues>({
    resolver: zodResolver(editGroupFormSchema),
    mode: "onChange",
    defaultValues: {
      name: group.name,
    },
  });

  function onSubmitEdit(data: EditGroupFormValues) {
    console.log("Editando grupo:");
    console.log(JSON.stringify(data, null, 2)); // Editar grupo
  }

  function onSubmitRemove(data: EditGroupFormValues) {
    console.log("Removendo grupo:");
    console.log(JSON.stringify(data, null, 2)); // Remover grupo
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
