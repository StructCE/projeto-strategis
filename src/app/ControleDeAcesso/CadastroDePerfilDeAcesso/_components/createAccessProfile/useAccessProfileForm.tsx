import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createAccessProfileFormSchema,
  type CreateAccessProfileFormValues,
} from "./accessProfileRegisterFormSchema";

export const useAccessProfileForm = () => {
  const form = useForm<CreateAccessProfileFormValues>({
    resolver: zodResolver(createAccessProfileFormSchema),
    mode: "onChange",
  });

  const [selectedModule, setSelectedModule] = useState<string[]>([]);

  function onSubmit(data: CreateAccessProfileFormValues) {
    console.log(JSON.stringify({ data, selectedModule }, null, 2)); // Criar perfil de acesso
  }

  return { form, onSubmit, selectedModule, setSelectedModule };
};
