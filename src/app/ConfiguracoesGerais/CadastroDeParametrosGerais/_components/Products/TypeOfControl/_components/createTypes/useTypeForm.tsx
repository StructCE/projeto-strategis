import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createTypeFormSchema,
  type CreateTypeFormValues,
} from "./typeRegisterFormSchema";

export const useTypeForm = () => {
  const form = useForm<CreateTypeFormValues>({
    resolver: zodResolver(createTypeFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateTypeFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar categoria
  }

  return { form, onSubmit };
};
