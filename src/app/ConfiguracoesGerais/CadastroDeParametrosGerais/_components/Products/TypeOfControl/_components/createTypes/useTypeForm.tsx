import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createTypeFormSchema,
  type CreateTypeFormValues,
} from "./typeRegisterFormSchema";

export const useTypeForm = () => {
  const controlTypeMutation =
    api.generalParameters.controlType.registerControlType.useMutation({
      onSuccess: (newControlType) => {
        console.log("Control type created successfully:", newControlType);
        alert("Tipo de controle criado com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error creating control type:", error);
        alert("Erro ao criar tipo de controle.");
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
    console.log(JSON.stringify(data, null, 2));

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
