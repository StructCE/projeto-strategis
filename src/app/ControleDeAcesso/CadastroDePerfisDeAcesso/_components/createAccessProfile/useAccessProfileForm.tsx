import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createAccessProfileFormSchema,
  type CreateAccessProfileFormValues,
} from "./accessProfileRegisterFormSchema";

export const useAccessProfileForm = () => {
  const roleMutation = api.role.registerRole.useMutation({
    onSuccess: (newRole) => {
      console.log("Role created successfully:", newRole);
      alert("Cargo criado com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error creating role:", error);
      alert("Erro ao criar cargo.");
    },
  });

  const form = useForm<CreateAccessProfileFormValues>({
    resolver: zodResolver(createAccessProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      modules: [],
    },
  });

  function onSubmit(data: CreateAccessProfileFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const roleData = {
      name: data.name,
      modules: data.modules ?? [],
    };

    try {
      roleMutation.mutate({
        ...roleData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
