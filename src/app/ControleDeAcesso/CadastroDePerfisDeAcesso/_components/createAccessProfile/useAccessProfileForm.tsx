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
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  function onSubmit(data: CreateAccessProfileFormValues) {
    console.log(JSON.stringify({ data, selectedModules }, null, 2)); // Criar perfil de acesso
  }

  return { form, onSubmit, selectedModules, setSelectedModules };
};
