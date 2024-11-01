import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createCompanyFormSchema,
  type CreateCompanyFormValues,
} from "./companyRegisterFormSchema";

export const useCompanyForm = () => {
  const router = useRouter();
  const createCompany = api.company.registerCompany.useMutation({
    onSuccess: () => {
      toast.success("Empresa criada com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      toast.error("Erro ao criar empresa.", {
        position: "bottom-right",
      });
      console.error(error);
    },
  });

  const form = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanyFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateCompanyFormValues) {
    // console.log(JSON.stringify(data, null, 2));
    createCompany.mutate(data);
  }

  return { form, onSubmit };
};
