import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createDocumentTypeFormSchema,
  type CreateDocumentTypeFormValues,
} from "./documentTypeRegisterFormSchema";

export const useDocumentTypeForm = () => {
  const form = useForm<CreateDocumentTypeFormValues>({
    resolver: zodResolver(createDocumentTypeFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateDocumentTypeFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar tipo de documento
  }

  return { form, onSubmit };
};
