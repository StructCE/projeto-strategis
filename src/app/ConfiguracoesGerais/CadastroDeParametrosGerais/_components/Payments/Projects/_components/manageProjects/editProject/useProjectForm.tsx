import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Project } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editProjectFormSchema,
  type EditProjectFormValues,
} from "./projectEditFormSchema";

export const useProjectForm = (project: Project) => {
  const form = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectFormSchema),
    mode: "onChange",
    defaultValues: {
      name: project.name,
    },
  });

  function onSubmitEdit(data: EditProjectFormValues) {
    console.log("Editando projeto:");
    console.log(JSON.stringify(data, null, 2)); // Editar projeto
  }

  function onSubmitRemove(data: EditProjectFormValues) {
    console.log("Removendo projeto:");
    console.log(JSON.stringify(data, null, 2)); // Remover projeto
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
