import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createStorageFormSchema,
  type CreateStorageFormValues,
} from "./storageRegisterFormSchema";

export const useStorageForm = () => {
  const cabinetMutation =
    api.generalParameters.cabinet.registerCabinet.useMutation({
      onSuccess: (newCabinet) => {
        console.log("Cabinet created successfully:", newCabinet);
        alert("Armário/zona criado com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error creating cabinet:", error);
        alert("Erro ao criar armário/zona.");
      },
    });

  const form = useForm<CreateStorageFormValues>({
    resolver: zodResolver(createStorageFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateStorageFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const cabinetData = {
      name: data.name,
    };

    try {
      cabinetMutation.mutate({
        ...cabinetData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
