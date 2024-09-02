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
    defaultValues: {
      name: "",
      cnpj: "",
      email: "",
      phone: "",
      state_registration: "",
      address: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
      contacts: [{ name: "", role: "", email: "", phone: "" }],
    },
  });

  function onSubmit(data: CreateSupplierFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar fornecedor
  }

  return { form, onSubmit };
};
