import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createCompanyFormSchema,
  type CreateCompanyFormValues,
} from "./companyRegisterFormSchema";

export const useCompanyForm = () => {
  const form = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanyFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateCompanyFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Cirar empresa
  }

  return { form, onSubmit };
};
