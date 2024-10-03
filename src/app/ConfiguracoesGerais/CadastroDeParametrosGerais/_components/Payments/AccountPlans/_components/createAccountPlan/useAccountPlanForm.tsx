import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createAccountPlanFormSchema,
  type CreateAccountPlanFormValues,
} from "./accountPlanRegisterFormSchema";

export const useAccountPlanForm = () => {
  const form = useForm<CreateAccountPlanFormValues>({
    resolver: zodResolver(createAccountPlanFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateAccountPlanFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar plano de conta
  }

  return { form, onSubmit };
};
