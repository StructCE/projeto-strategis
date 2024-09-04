import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createCategoryFormSchema,
  type CreateCategoryFormValues,
} from "./unitRegisterFormSchema";

export const useCategoryForm = () => {
  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateCategoryFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar categoria
  }

  return { form, onSubmit };
};
