import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "~/trpc/react";
import {
  createShelfFormSchema,
  type CreateShelfFormValues,
} from "./shelvesRegisterFormSchema";

export const useShelfForm = () => {
  const shelfMutation = api.generalParameters.shelf.registerShelf.useMutation({
    onSuccess: (newShelf) => {
      console.log("Shelf created successfully:", newShelf);
      toast.success("Prateleira criada com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating shelf:", error);
      toast.error("Erro ao criar prateleira.", {
        position: "bottom-right",
      });
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
