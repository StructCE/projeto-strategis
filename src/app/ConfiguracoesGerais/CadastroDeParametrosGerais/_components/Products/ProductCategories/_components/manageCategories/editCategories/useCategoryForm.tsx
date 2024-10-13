import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type ProductCategory } from "~/server/interfaces/productCategory/productCategory.route.interfaces";
import { api } from "~/trpc/react";
import {
  editCategoryFormSchema,
  type EditCategoryFormValues,
} from "./categoryEditFormSchema";

export const useCategoryForm = (category: ProductCategory) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const categoryMutation =
    api.generalParameters.productCategory.editProductCategory.useMutation({
      onSuccess: (updatedCategory) => {
        console.log("Category updated successfully:", updatedCategory);
        if (isDeleted === false) {
          alert("Categoria atualizada com sucesso.");
        }
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error updating category:", error);
        alert("Erro ao atualizar categoria.");
      },
    });

  const deleteCategoryMutation =
    api.generalParameters.productCategory.removeProductCategory.useMutation({
      onSuccess: (deletedCategory) => {
        console.log("Category removed successfully:", deletedCategory);
        alert("Categoria removida com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error removing category:", error);
        alert("Erro ao remover categoria.");
      },
    });

  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      name: category.name,
    },
  });

  function onSubmitEdit(data: EditCategoryFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      categoryMutation.mutate({
        id: category.id,
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteCategoryMutation.mutate({
        id: category.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
