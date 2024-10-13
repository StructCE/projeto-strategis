import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createUnitFormSchema,
  type CreateUnitFormValues,
} from "./unitRegisterFormSchema";

export const useUnitForm = () => {
  const unitMutation = api.generalParameters.unit.registerUnit.useMutation({
    onSuccess: (newUnit) => {
      console.log("Unit created successfully:", newUnit);
      alert("Unidade criada com sucesso.");
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error creating unit:", error);
      alert("Erro ao criar unidade.");
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
    console.log(JSON.stringify(data, null, 2));

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
