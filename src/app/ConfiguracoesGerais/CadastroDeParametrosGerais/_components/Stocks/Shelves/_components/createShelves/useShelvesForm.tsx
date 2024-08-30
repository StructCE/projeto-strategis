import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createShelfFormSchema,
  type CreateShelfFormValues,
} from "./shelvesRegisterFormSchema";

export const useShelfForm = () => {
  const form = useForm<CreateShelfFormValues>({
    resolver: zodResolver(createShelfFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateShelfFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar prateleira
  }

  return { form, onSubmit };
};
