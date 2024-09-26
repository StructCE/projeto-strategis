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
      company_type: company.company_type,
      suppliers: company.suppliers.map((supplier) => supplier.name),
      company_headquarters: {
        name: company.company_headquarters?.name,
        cnpj: company.company_headquarters?.cnpj,
      },
      email: company.email,
      phone: company.phone,
      address: company.address,
      neighborhood: company.neighborhood,
      city: company.city,
      state: company.state,
      cep: company.cep,
      state_registration: company.state_registration,
      tax_regime: company.tax_regime,
      address_file_XML: company.xmlFilePath,
      legal_representative: company.legal_representative.name,
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
