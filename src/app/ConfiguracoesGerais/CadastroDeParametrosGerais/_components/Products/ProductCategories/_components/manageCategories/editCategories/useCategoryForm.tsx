import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ProductCategory } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editCategoryFormSchema,
  type EditCategoryFormValues,
} from "./categoryEditFormSchema";

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
