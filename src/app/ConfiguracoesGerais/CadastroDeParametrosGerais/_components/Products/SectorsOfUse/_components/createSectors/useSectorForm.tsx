import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createSectorFormSchema,
  type CreateSectorFormValues,
} from "./sectorRegisterFormSchema";

export const useSectorForm = () => {
  const categoryMutation =
    api.generalParameters.useSector.registerUseSector.useMutation({
      onSuccess: (newSector) => {
        console.log("Sector created successfully:", newSector);
        toast.success("Setor criado com sucesso. Atualizando a página...", {
          position: "bottom-right",
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error creating sector:", error);
        toast.error("Erro ao criar setor.", {
          position: "bottom-right",
        });
      },
    });

  const form = useForm<CreateSectorFormValues>({
    resolver: zodResolver(createSectorFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateSectorFormValues) {
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
