import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createStorageFormSchema,
  type CreateStorageFormValues,
} from "./storageRegisterFormSchema";

export const useStorageForm = () => {
  const form = useForm<CreateStorageFormValues>({
    resolver: zodResolver(createStorageFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateStorageFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar armário/zona
  }

  return { form, onSubmit };
};
