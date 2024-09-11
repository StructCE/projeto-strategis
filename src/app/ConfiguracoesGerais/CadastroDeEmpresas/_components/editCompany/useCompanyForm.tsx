import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { type Companies } from "../manageCompany/companiesData";
import {
  editCompanyFormSchema,
  type EditCompanyFormValues,
} from "./companyEditFormSchema";

const defaultCompany: Companies = {
  empresa: "",
  cnpj: "",
  tipo_empresa: "Matriz",
  matriz_empresa: [],
  filial_empresa: [],
  email: "",
  phone: "",
  endereco: "",
  bairro: "",
  municipio: "",
  uf: "",
  cep: "",
  inscricao_estadual: "",
  regime_tributario: "",
  legalRepresentative: [],
  xmlFilePath: "",
  registered_products: 0,
  registered_suppliers: 0,
  low_stock_products: 0,
};

export const useCompanyForm = (company: Companies = defaultCompany) => {
  const form = useForm<EditCompanyFormValues>({
    resolver: zodResolver(editCompanyFormSchema),
    mode: "onChange",
    defaultValues: {
      empresa: company.empresa,
      cnpj: company.cnpj,
      tipo_empresa: company.tipo_empresa,
      matriz_empresa:
        company.tipo_empresa === "Matriz" ? (company.matriz_empresa ?? []) : [],
      filial_empresa:
        company.tipo_empresa === "Filial" ? (company.filial_empresa ?? []) : [],
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
      legalRepresentative: company.legalRepresentative.map(
        (legalRepresentative) => ({
          name: legalRepresentative.name,
          role: legalRepresentative.role.value,
          email: legalRepresentative.email,
          phone: legalRepresentative.phone,
        }),
      ),
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

  const fieldArray = useFieldArray({
    control: form.control,
    name: "legalRepresentative",
  });

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
    fieldsArray: fieldArray.fields,
  };
};
