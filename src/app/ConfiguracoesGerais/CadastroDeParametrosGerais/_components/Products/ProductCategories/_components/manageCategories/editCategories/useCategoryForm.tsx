import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
          toast.success(
            "Categoria atualizada com sucesso. Atualizando a página...",
            {
              position: "bottom-right",
            },
          );
        }
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error updating category:", error);
        toast.error("Erro ao atualizar categoria.", {
          position: "bottom-right",
        });
      },
    });

  const deleteCategoryMutation =
    api.generalParameters.productCategory.removeProductCategory.useMutation({
      onSuccess: (deletedCategory) => {
        console.log("Category removed successfully:", deletedCategory);
        toast.success(
          "Categoria removida com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error removing category:", error);
        toast.error("Erro ao remover categoria.", {
          position: "bottom-right",
        });
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
