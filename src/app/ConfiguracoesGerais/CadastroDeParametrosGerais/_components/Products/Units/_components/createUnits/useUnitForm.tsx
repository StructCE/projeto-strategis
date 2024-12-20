import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createUnitFormSchema,
  type CreateUnitFormValues,
} from "./unitRegisterFormSchema";

export const useUnitForm = () => {
  const router = useRouter();
  const unitMutation = api.generalParameters.unit.registerUnit.useMutation({
    onSuccess: (newUnit) => {
      // console.log("Unit created successfully:", newUnit);
      toast.success("Unidade criada com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating unit:", error);
      toast.error("Erro ao criar unidade.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<CreateUnitFormValues>({
    resolver: zodResolver(createUnitFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateUnitFormValues) {
    // console.log(JSON.stringify(data, null, 2));

    const unitData = {
      name: data.name,
      abbreviation: data.abbreviation,
      unitsPerPack: data.unitsPerPack,
    };

    try {
      unitMutation.mutate({
        ...unitData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
