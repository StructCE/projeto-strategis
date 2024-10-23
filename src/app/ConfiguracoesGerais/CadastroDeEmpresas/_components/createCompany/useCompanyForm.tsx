import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createCompanyFormSchema,
  type CreateCompanyFormValues,
} from "./companyRegisterFormSchema";
import { api } from "~/trpc/react";

export const useCompanyForm = () => {
  const createCompany = api.company.registerCompany.useMutation({
    onSuccess: () => {
      alert("Empresa criada");
    },
    onError: (error) => {
      alert("Erro na criação da empresa");
      console.log(error);
    },
  });

  const form = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanyFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateCompanyFormValues) {
    console.log(JSON.stringify(data, null, 2));
    createCompany.mutate(data);
  }

  return { form, onSubmit };
};
