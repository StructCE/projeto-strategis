import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  type CompanyRepositoryInterfaces,
  companyRepositorySchema,
} from "~/server/interfaces/company/company.repository.interfaces";
import type { CompanyRouteInterfaces } from "~/server/interfaces/company/company.route.interfaces";
import { api } from "~/trpc/react";

export const useCompanyForm = (
  company: CompanyRouteInterfaces["EditCompany"],
) => {
  const router = useRouter();
  const editCompany = api.company.editCompany.useMutation({
    onSuccess: () => {
      toast.success("Empresa atualizada com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar empresa.", {
        position: "bottom-right",
      });
      console.error(error);
    },
  });

  const removeCompany = api.company.deleteCompany.useMutation({
    onSuccess: () => {
      toast.success("Empresa removida com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      toast.error("Erro ao remover empresa.", {
        position: "bottom-right",
      });
      console.error(error);
    },
  });

  const form = useForm<CompanyRepositoryInterfaces["EditProps"]>({
    resolver: zodResolver(companyRepositorySchema.editProps),
    mode: "onChange",

    defaultValues: {
      id: company.id,
      data: {
        ...company,
        email: company.email ?? undefined,
        type: company.type ?? undefined,
        taxRegime: company.taxRegime ?? undefined,
        suppliers: company.suppliers.map((supplier) => supplier.id),
        legalResponsibleId: company.legalResponsibleId,
      },
    },
  });

  function onSubmitEdit(data: CompanyRepositoryInterfaces["EditProps"]) {
    editCompany.mutate(data);
    // console.log(JSON.stringify(data, null, 2));
  }

  function onSubmitRemove(data: CompanyRepositoryInterfaces["DeleteProps"]) {
    removeCompany.mutate(data);
    // console.log(JSON.stringify(data, null, 2));
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
  };
};
