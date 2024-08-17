import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserFormSchema, CreateUserFormValues } from "./formSchema";

export const useUserForm = () => {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateUserFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar usuário
  }

  return { form, onSubmit };
};
