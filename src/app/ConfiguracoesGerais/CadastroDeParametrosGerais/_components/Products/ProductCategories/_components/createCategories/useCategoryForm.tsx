import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createCategoryFormSchema,
  type CreateCategoryFormValues,
} from "./categoryRegisterFormSchema";

export const useCategoryForm = () => {
  const categoryMutation =
    api.generalParameters.productCategory.registerProductCategory.useMutation({
      onSuccess: (newCategory) => {
        console.log("Category created successfully:", newCategory);
        alert("Categoria criada com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error creating category:", error);
        alert("Erro ao criar categoria.");
      },
    });

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateCategoryFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const categoryData = {
      name: data.name,
    };

    try {
      categoryMutation.mutate({
        ...categoryData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
