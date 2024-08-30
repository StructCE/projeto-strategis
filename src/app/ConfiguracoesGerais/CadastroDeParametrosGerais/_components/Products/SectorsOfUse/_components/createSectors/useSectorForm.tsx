import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createSectorFormSchema,
  type CreateSectorFormValues,
} from "./sectorRegisterFormSchema";

export const useSectorForm = () => {
  const form = useForm<CreateSectorFormValues>({
    resolver: zodResolver(createSectorFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateSectorFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar setor
  }

  return { form, onSubmit };
};
