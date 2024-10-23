import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createStorageFormSchema,
  type CreateStorageFormValues,
} from "./storageRegisterFormSchema";

export const useStorageForm = () => {
  // const { toast } = useToast();

  const cabinetMutation =
    api.generalParameters.cabinet.registerCabinet.useMutation({
      onSuccess: (newCabinet) => {
        console.log("Cabinet created successfully:", newCabinet);
        toast.success(
          "Armário/zona criado com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error creating cabinet:", error);
        toast.error("Erro ao criar armário/zona.", {
          position: "bottom-right",
        });
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
