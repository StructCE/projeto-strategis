import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createReasonFormSchema,
  type CreateReasonFormValues,
} from "./reasonRegisterFormSchema";

export const useReasonForm = () => {
  const form = useForm<CreateReasonFormValues>({
    resolver: zodResolver(createReasonFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateReasonFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar motivo
  }

  return { form, onSubmit };
};
