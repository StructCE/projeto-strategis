import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type DocumentType } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editDocumentTypeFormSchema,
  type EditDocumentTypeFormValues,
} from "./documentTypeEditFormSchema";

export const useDocumentTypeForm = (doc_type: DocumentType) => {
  const form = useForm<EditDocumentTypeFormValues>({
    resolver: zodResolver(editDocumentTypeFormSchema),
    mode: "onChange",
    defaultValues: {
      name: doc_type.name,
    },
  });

  function onSubmitEdit(data: EditDocumentTypeFormValues) {
    console.log("Editando setor:");
    console.log(JSON.stringify(data, null, 2)); // Editar setor
  }

  function onSubmitRemove(data: EditDocumentTypeFormValues) {
    console.log("Removendo setor:");
    console.log(JSON.stringify(data, null, 2)); // Remover setor
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
