import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ProductCategory } from "../../../../../GeneralParametersData";
import {
  editCategoryFormSchema,
  type EditCategoryFormValues,
} from "./unitEditFormSchema";

export const useCategoryForm = (category: ProductCategory) => {
  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      description: category.description,
    },
  });

  function onSubmitEdit(data: EditCategoryFormValues) {
    console.log("Editando categoria:");
    console.log(JSON.stringify(data, null, 2)); // Editar categoria
  }

  function onSubmitRemove(data: EditCategoryFormValues) {
    console.log("Removendo categoria:");
    console.log(JSON.stringify(data, null, 2)); // Remover categoria
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
