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
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  function onSubmit(data: CreateAccessProfileFormValues) {
    console.log(JSON.stringify({ data, selectedFrameworks }, null, 2)); // Criar perfil de acesso
  }

  return { form, onSubmit, selectedFrameworks, setSelectedFrameworks };
};
