import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createTypeFormSchema,
  type CreateTypeFormValues,
} from "./typeRegisterFormSchema";

export const useTypeForm = () => {
  const router = useRouter();
  const controlTypeMutation =
    api.generalParameters.controlType.registerControlType.useMutation({
      onSuccess: (newControlType) => {
        // console.log("Control type created successfully:", newControlType);
        toast.success(
          "Tipo de controle criado com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
        setTimeout(() => {
          router.refresh();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error creating control type:", error);
        toast.error("Erro ao criar tipo de controle.", {
          position: "bottom-right",
        });
      },
    });

  const form = useForm<CreateTypeFormValues>({
    resolver: zodResolver(createTypeFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateTypeFormValues) {
    // console.log(JSON.stringify(data, null, 2));

    const controlTypeData = {
      name: data.name,
    };

    try {
      controlTypeMutation.mutate({
        ...controlTypeData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
