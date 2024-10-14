import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createShelfFormSchema,
  type CreateShelfFormValues,
} from "./shelvesRegisterFormSchema";

export const useShelfForm = () => {
  const shelfMutation = api.generalParameters.shelf.registerShelf.useMutation({
    onSuccess: (newShelf) => {
      console.log("Shelf created successfully:", newShelf);
      alert("Prateleira criada com sucesso.");
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error creating shelf:", error);
      alert("Erro ao criar prateleira.");
    },
  });

  const form = useForm<CreateShelfFormValues>({
    resolver: zodResolver(createShelfFormSchema),
    mode: "onChange",
    defaultValues: {
      cabinetId: "",
      name: "",
    },
  });

  function onSubmit(data: CreateShelfFormValues) {
    console.log(JSON.stringify(data, null, 2));

    // Dados para criar a Shelf e a relação com o Cabinet
    const shelfData = {
      name: data.name,
      cabinetId: data.cabinetId, // ID do StockCabinet associado
    };

    try {
      // Chama a mutação que cria a Shelf e a relação na tabela CabinetShelf
      shelfMutation.mutate({
        ...shelfData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
