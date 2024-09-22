import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Company } from "../../../../_components/companiesData";
import {
  editCompanyFormSchema,
  type EditCompanyFormValues,
} from "./companyEditFormSchema";

export const useCompanyForm = (company: Company) => {
  const form = useForm<EditCompanyFormValues>({
    resolver: zodResolver(editCompanyFormSchema),
    mode: "onChange",
    defaultValues: {
      name: company.name,
      cnpj: company.cnpj,
      tipo_empresa: company.tipo_empresa,
      fornecedores: company.suppliers.map((supplier) => supplier.name),
      matriz_empresa: {
        name: company.matriz_empresa?.name,
        cnpj: company.matriz_empresa?.cnpj,
      },
      email: company.email,
      phone: company.phone,
      address: company.endereco,
      bairro: company.bairro,
      municipio: company.municipio,
      uf: company.uf,
      cep: company.cep,
      inscricao_estadual: company.inscricao_estadual,
      regime_tributario: company.regime_tributario,
      address_file_XML: company.xmlFilePath,
      legalRepresentative: {
        name: company.legalRepresentative.name,
        role: company.legalRepresentative.role.value,
        email: company.legalRepresentative.email,
        phone: company.legalRepresentative.phone,
      },
    },
  });

  function onSubmitEdit(data: EditCompanyFormValues) {
    console.log("Editando empresa");
    console.log(JSON.stringify(data, null, 2));
  }

  function onSubmitRemove(data: EditCompanyFormValues) {
    console.log("Removendo empresa");
    console.log(JSON.stringify(data, null, 2));
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
  };
};
