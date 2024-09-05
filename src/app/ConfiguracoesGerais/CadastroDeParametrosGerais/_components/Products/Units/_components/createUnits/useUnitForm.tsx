import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createUnitFormSchema,
  type CreateUnitFormValues,
} from "./unitRegisterFormSchema";

export const useUnitForm = () => {
  const form = useForm<CreateUnitFormValues>({
    resolver: zodResolver(createUnitFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateUnitFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar unidade
  }

  return { form, onSubmit };
};
