import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createCategoryFormSchema,
  type CreateCategoryFormValues,
} from "./categoryRegisterFormSchema";

export const useCategoryForm = () => {
  const router = useRouter();
  const categoryMutation =
    api.generalParameters.productCategory.registerProductCategory.useMutation({
      onSuccess: (newCategory) => {
        console.log("Category created successfully:", newCategory);
        toast.success("Categoria criada com sucesso. Atualizando a página...", {
          position: "bottom-right",
        });
        setTimeout(() => {
          router.refresh();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error creating category:", error);
        toast.error("Erro ao criar categoria.", {
          position: "bottom-right",
        });
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
