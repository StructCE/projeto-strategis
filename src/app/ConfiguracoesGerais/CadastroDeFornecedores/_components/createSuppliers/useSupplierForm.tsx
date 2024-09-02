import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createSupplierFormSchema,
  type CreateSupplierFormValues,
} from "./supplierRegisterFormSchema";

export const useSupplierForm = () => {
  const form = useForm<CreateSupplierFormValues>({
    resolver: zodResolver(createSupplierFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateSupplierFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar fornecedor
  }

  return { form, onSubmit };
};
