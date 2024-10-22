import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type CompanyRepositoryInterfaces,
  companyRepositorySchema,
} from "~/server/interfaces/company/company.repository.interfaces";
import type { CompanyRouteInterfaces } from "~/server/interfaces/company/company.route.interfaces";
import { api } from "~/trpc/react";

export const useCompanyForm = (
  company: CompanyRouteInterfaces["EditCompany"],
) => {
  const editCompany = api.company.editCompany.useMutation({
    onSuccess: () => alert("Mudanças salvas"),
    onError: (error) => {
      alert("Erro no salvamento das mudanças");
      console.log(error);
    },
  });

  const removeCompany = api.company.deleteCompany.useMutation({
    onSuccess: () => alert("Empresa deletada com sucesso"),
    onError: (error) => {
      alert("Erro ao deletar empresa");
      console.log(error);
    },
  });

  const form = useForm<CompanyRepositoryInterfaces["EditProps"]>({
    resolver: zodResolver(companyRepositorySchema.editProps),
    mode: "onChange",

    defaultValues: {
      id: company.id,
      data: {
        ...company,
        suppliers: company.suppliers.map((supplier) => supplier.id),
        legalResponsibleId: company.legalResponsibleId,
      },
    },
  });

  function onSubmitEdit(data: CompanyRepositoryInterfaces["EditProps"]) {
    editCompany.mutate(data);
    console.log(JSON.stringify(data, null, 2));
  }

  function onSubmitRemove(data: CompanyRepositoryInterfaces["DeleteProps"]) {
    removeCompany.mutate(data);
    console.log(JSON.stringify(data, null, 2));
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
  };
};
