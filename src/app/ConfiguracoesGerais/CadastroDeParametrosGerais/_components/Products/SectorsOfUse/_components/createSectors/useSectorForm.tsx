import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
        alert("Setor criado com sucesso.");
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      onError: (error) => {
        console.error("Error creating sector:", error);
        alert("Erro ao criar setor.");
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
